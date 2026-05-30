"""
SwasthAI Guardian — AI Health Agent Core
=========================================
Conversational symptom assessment with:
  • Multi-turn dialogue (session history)
  • Risk scoring: Low / Medium / High / Critical (0–100 numeric)
  • Emergency auto-detection (Hindi + English)
  • Follow-up question generation
  • Recommended next actions
  • Bilingual responses (Hindi + English)
  • ASHA escalation triggers

GitHub Copilot DevDays — Principal Architecture Implementation
"""

import os
import re
import time
from typing import Optional
from groq import Groq

# ── Emergency Keywords (triggers Critical risk immediately) ─────────────────────
EMERGENCY_KEYWORDS_EN = [
    "snake bite", "snakebite", "snake", "unconscious", "not breathing",
    "chest pain", "heart attack", "convulsion", "seizure", "fits", "collapse",
    "collapsed", "heavy bleeding", "blood vomit", "blood in urine", "stroke",
    "can't breathe", "cannot breathe", "choking", "drowning", "poisoning",
    "severe burn", "electric shock", "accident", "trauma", "head injury",
    "no pulse", "fainted", "fainting", "anaphylaxis", "allergic reaction severe"
]

EMERGENCY_KEYWORDS_HI = [
    "saanp", "saanp ne kata", "saanp kata", "behosh", "sans nahi", "sans band",
    "chhati mein dard", "dil ka dora", "dauraa", "mircchi", "behoshi",
    "bahut zyada khoon", "khoon ki ulti", "pesha mein khoon",
    "stroke", "sans nahi aa raha", "dab gaya", "haadsa", "sar mein chot",
    "behosh ho gaya", "behosh ho gayi", "bhaari khoon", "bilkul sans nahi",
    "nadi nahi chal rahi", "poora behosh", "behoshi aa gayi"
]

EMERGENCY_KEYWORDS_DEVANAGARI = [
    "सांप", "बेहोश", "सांस नहीं", "सांस बंद", "छाती में दर्द", "दिल का दौरा",
    "दौरा", "मिर्गी", "बेहोशी", "बहुत ज्यादा खून", "खून की उल्टी",
    "स्ट्रोक", "दुर्घटना", "सिर में चोट", "नाड़ी नहीं चल रही"
]

ALL_EMERGENCY_KEYWORDS = (
    EMERGENCY_KEYWORDS_EN + EMERGENCY_KEYWORDS_HI + EMERGENCY_KEYWORDS_DEVANAGARI
)

# ── Symptom Risk Weights ────────────────────────────────────────────────────────
# Higher weight = more severe symptom
SYMPTOM_WEIGHTS = {
    # Critical indicators
    "chest pain": 40, "chhati mein dard": 40, "छाती में दर्द": 40,
    "difficulty breathing": 35, "sans phulna": 35, "breathless": 35,
    "blood vomit": 40, "खून की उल्टी": 40,
    "convulsion": 45, "seizure": 45, "fits": 45, "dauraa": 45, "दौरा": 45,
    "unconscious": 50, "behosh": 50, "बेहोश": 50,
    "heavy bleeding": 40, "bhaari khoon": 40, "bahut khoon": 40,
    "snake": 50, "saanp": 50, "सांप": 50,

    # High severity
    "high fever": 20, "tej bukhar": 20, "102": 18, "103": 20, "104": 25,
    "vomiting blood": 35, "blood in stool": 30, "khoon ki potty": 30,
    "severe dehydration": 25, "sunken eyes": 22, "koi hosh nahi": 30,
    "paralysis": 35, "numbness": 20, "severe headache": 18,
    "stiff neck": 22, "gardan akad": 22,
    "yellow eyes": 15, "piliya": 15, "पीलिया": 15,
    "rash spreading": 18, "blister": 15, "chhale": 15,

    # Medium severity
    "fever": 10, "bukhar": 10, "बुखार": 10,
    "vomiting": 12, "ulti": 12, "उल्टी": 12,
    "diarrhea": 12, "dast": 12, "दस्त": 12,
    "headache": 8, "sir dard": 8, "सिर दर्द": 8,
    "body pain": 8, "badan dard": 8, "बदन दर्द": 8,
    "cough": 8, "khansi": 8, "खांसी": 8,
    "joint pain": 10, "jodon mein dard": 10, "जोड़ों में दर्द": 10,
    "eye pain": 10, "aankhon mein dard": 10, "आंखों में दर्द": 10,
    "rash": 10, "daane": 10, "दाने": 10,
    "weakness": 8, "kamzori": 8, "कमजोरी": 8,
    "chills": 10, "thandi": 10, "ठंडी": 10,
    "sweating": 8, "pasina": 8, "पसीना": 8,
    "appetite loss": 6, "bhookh na lagna": 6, "भूख न लगना": 6,

    # Low severity
    "cold": 4, "sardi": 4, "सर्दी": 4,
    "runny nose": 4, "naak bahna": 4,
    "sore throat": 5, "gala dard": 5, "गला दर्द": 5,
    "mild fever": 5, "halka bukhar": 5,
    "fatigue": 6, "thakan": 6, "थकान": 6,
    "itching": 5, "khujli": 5, "खुजली": 5,
    "stomach pain": 8, "pet dard": 8, "पेट दर्द": 8,
}

# ── Duration Multipliers ────────────────────────────────────────────────────────
DURATION_MULTIPLIERS = {
    "1 day": 1.0, "1 din": 1.0, "ek din": 1.0,
    "2 days": 1.1, "2 din": 1.1, "do din": 1.1,
    "3 days": 1.2, "3 din": 1.2, "teen din": 1.2,
    "4 days": 1.3, "4 din": 1.3, "char din": 1.3,
    "5 days": 1.4, "5 din": 1.4, "paanch din": 1.4,
    "week": 1.5, "hafte": 1.5, "ek hafta": 1.5,
    "2 weeks": 1.7, "2 hafte": 1.7,
    "month": 2.0, "mahina": 2.0, "ek mahina": 2.0,
}

# ── Follow-Up Question Bank ─────────────────────────────────────────────────────
FOLLOW_UP_QUESTIONS = {
    "fever": {
        "en": [
            "How long have you had fever? (1 day, 3 days, a week?)",
            "Is the fever continuous or does it come and go with chills?",
            "Do you have any rash or spots on your body?",
            "Do you have pain behind your eyes or in your joints?"
        ],
        "hi": [
            "Bukhar kitne din se hai? (1 din, 3 din, ek hafte se?)",
            "Kya bukhar lagatar rehta hai ya tha-tha karke aata hai?",
            "Kya shareer par koi daane ya rash hain?",
            "Kya aankhon ke peeche ya jodon mein dard hai?"
        ]
    },
    "cough": {
        "en": [
            "How long have you had this cough?",
            "Is there any blood or phlegm when you cough?",
            "Do you have difficulty breathing or chest pain?",
            "Have you lost weight recently?"
        ],
        "hi": [
            "Khansi kitne dino se hai?",
            "Khansi ke saath khoon ya balgam aata hai?",
            "Kya saans lene mein takleef ho rahi hai?",
            "Kya haaal mein wazan kam hua hai?"
        ]
    },
    "stomach": {
        "en": [
            "Is there any vomiting or loose stools?",
            "How many times have you had loose stools today?",
            "Is there blood in your stool?",
            "Are you able to drink water and keep it down?"
        ],
        "hi": [
            "Kya ulti ho rahi hai ya dast lag rahe hain?",
            "Aaj kitni baar dast hua?",
            "Kya latrine mein khoon aa raha hai?",
            "Kya pani peene ke baad wapas aa jaata hai?"
        ]
    },
    "rash": {
        "en": [
            "Where on the body is the rash? (face, body, arms?)",
            "Are the spots flat or raised with fluid inside?",
            "Do you have fever along with the rash?",
            "Is the rash spreading or staying in one place?"
        ],
        "hi": [
            "Daane shareer ke kis hisse mein hain?",
            "Kya daane chapta hain ya andar pani bhara hua hai?",
            "Kya daanon ke saath bukhar bhi hai?",
            "Kya daane failte ja rahe hain?"
        ]
    },
    "breathing": {
        "en": [
            "How severe is the breathing difficulty? (mild, moderate, severe?)",
            "Did it start suddenly or gradually?",
            "Do you have chest pain along with difficulty breathing?",
            "Is there any blue color on your lips or fingernails?"
        ],
        "hi": [
            "Saans ki takleef kitni badhi hai?",
            "Kya yeh achanak aaya ya dheere-dheere?",
            "Saans ke saath chhati mein dard hai?",
            "Kya honthon ya naakhoon mein neela rang dikha?"
        ]
    },
    "default": {
        "en": [
            "How long have you had these symptoms?",
            "Do you have any fever along with these symptoms?",
            "Are the symptoms getting better or worse?",
            "Have you taken any medicine for this?"
        ],
        "hi": [
            "Yeh takleef kitne dino se hai?",
            "Kya inke saath bukhar bhi hai?",
            "Kya aaram ho raha hai ya takleef badh rahi hai?",
            "Kya aapne koi dawa li hai?"
        ]
    }
}

# ── Recommended Actions by Risk Level ──────────────────────────────────────────
ACTIONS_BY_RISK = {
    "Critical": {
        "en": [
            "🚨 CALL 108 IMMEDIATELY — Free ambulance",
            "Do not move the patient unnecessarily",
            "Stay with the patient and keep them calm",
            "Alert your ASHA worker right now",
            "Go to nearest government hospital immediately"
        ],
        "hi": [
            "🚨 ABHI 108 PAR CALL KAREN — Muft ambulance",
            "Mariz ko zyada hilne mat den",
            "Mariz ke saath rahen, unhe shant rakhen",
            "Apni ASHA didi ko abhi alert karen",
            "Naktam sarkaari aspatal mein turant jayein"
        ]
    },
    "High": {
        "en": [
            "⚠️ Visit PHC or government hospital TODAY",
            "Alert your ASHA worker",
            "Keep patient hydrated with ORS or clean water",
            "Note down all symptoms to tell the doctor",
            "Do NOT delay — go within 2-3 hours"
        ],
        "hi": [
            "⚠️ AAJ HI PHC ya sarkaari aspatal jayein",
            "Apni ASHA didi ko batayein",
            "ORS ya saaf pani pilate rahen",
            "Sabhi lakshan likh len aur doctor ko batayen",
            "Deri mat karen — 2-3 ghante mein jayein"
        ]
    },
    "Medium": {
        "en": [
            "🏥 Visit nearest PHC within 24 hours",
            "Consult your ASHA worker for guidance",
            "Take rest and drink plenty of fluids",
            "Take paracetamol only if fever is above 38°C",
            "Monitor symptoms — if worse, go immediately"
        ],
        "hi": [
            "🏥 24 ghante mein naktam PHC jayein",
            "ASHA didi se salah len",
            "Aaram karen aur zyada pani/ORS peeyen",
            "Sirf paracetamol len agar bukhar zyada ho",
            "Lakshano par dhyan rakhen — badhe to turant jayein"
        ]
    },
    "Low": {
        "en": [
            "🏠 Home care is sufficient for now",
            "Drink clean boiled water and rest well",
            "Take paracetamol for fever if needed",
            "Eat light, easy-to-digest food",
            "Contact ASHA worker if not improving in 2 days"
        ],
        "hi": [
            "🏠 Abhi ghar par treatment kaafi hai",
            "Ubla hua saaf pani peeyen aur aaram karen",
            "Zaroorat par paracetamol len",
            "Halka aur aasani se pachne wala khana khayein",
            "2 din mein theek na ho to ASHA didi se miilen"
        ]
    }
}


def is_emergency(text: str) -> bool:
    """Detect emergency symptoms in any language."""
    text_lower = text.lower()
    for kw in ALL_EMERGENCY_KEYWORDS:
        if kw.lower() in text_lower:
            return True
    return False


def calculate_risk_score(messages: list[dict]) -> tuple[int, str]:
    """
    Calculate risk score (0-100) from full conversation history.
    Returns (score, level) where level is Low/Medium/High/Critical.

    GitHub Copilot: Scaffolded with prompt
    'Create a medical risk scoring function that takes symptom history
    and returns a severity score 0-100 with Low/Medium/High/Critical labels'
    """
    combined_text = " ".join(
        m.get("content", "") for m in messages if m.get("role") == "user"
    ).lower()

    # Emergency override
    if is_emergency(combined_text):
        return 95, "Critical"

    total_score = 0

    # Score symptoms
    for symptom, weight in SYMPTOM_WEIGHTS.items():
        if symptom.lower() in combined_text:
            total_score += weight

    # Apply duration multiplier
    multiplier = 1.0
    for duration_phrase, mult in DURATION_MULTIPLIERS.items():
        if duration_phrase.lower() in combined_text:
            if mult > multiplier:
                multiplier = mult

    total_score = min(int(total_score * multiplier), 100)

    # Classify
    if total_score >= 76:
        return total_score, "Critical"
    elif total_score >= 51:
        return total_score, "High"
    elif total_score >= 26:
        return total_score, "Medium"
    else:
        return max(total_score, 5), "Low"


def detect_symptom_category(text: str) -> str:
    """Identify the primary symptom category for follow-up questions."""
    text_lower = text.lower()

    categories = {
        "fever": ["fever", "bukhar", "बुखार", "ताप", "temperature", "tej bukhar"],
        "cough": ["cough", "khansi", "खांसी", "balgam", "tb", "tuberculosis"],
        "stomach": ["stomach", "pet", "पेट", "diarrhea", "dast", "दस्त", "vomit", "ulti", "उल्टी"],
        "rash": ["rash", "daane", "दाने", "spots", "blister", "chhale", "skin"],
        "breathing": ["breathing", "breath", "sans", "सांस", "breathless", "saans", "chest"],
    }

    scores = {cat: 0 for cat in categories}
    for cat, keywords in categories.items():
        for kw in keywords:
            if kw in text_lower:
                scores[cat] += 1

    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "default"


def get_follow_up_questions(text: str, language: str = "en", count: int = 2) -> list[str]:
    """Get relevant follow-up questions based on symptoms and language."""
    category = detect_symptom_category(text)
    lang = "hi" if language == "hi" else "en"
    questions = FOLLOW_UP_QUESTIONS.get(category, FOLLOW_UP_QUESTIONS["default"])
    return questions[lang][:count]


def get_recommended_actions(risk_level: str, language: str = "en") -> list[str]:
    """Get recommended next actions for the given risk level."""
    lang = "hi" if language == "hi" else "en"
    return ACTIONS_BY_RISK.get(risk_level, ACTIONS_BY_RISK["Low"])[lang]


def detect_language(text: str) -> str:
    """Auto-detect if user is writing in Hindi (Devanagari or transliterated)."""
    # Check for Devanagari script
    if re.search(r'[\u0900-\u097F]', text):
        return "hi"

    # Check for Hindi transliteration keywords
    hindi_indicators = [
        "bukhar", "dard", "khoon", "ulti", "khansi", "sans", "pet",
        "sir", "badan", "thakan", "kamzori", "daane", "chakkar",
        "hai", "hain", "mujhe", "mera", "meri", "mere", "kya", "aur",
        "se", "ko", "ki", "ka", "ho", "raha", "rahi", "nahi"
    ]
    text_lower = text.lower()
    hindi_count = sum(1 for kw in hindi_indicators if kw in text_lower.split())
    return "hi" if hindi_count >= 2 else "en"


def build_agent_system_prompt(language: str, risk_level: str, turn_number: int) -> str:
    """Build the Groq system prompt for the health agent conversation."""

    base_identity = """You are SwasthAI Health Agent — a compassionate, highly accurate AI health assistant for rural India.
You speak simply and warmly, like a trusted doctor friend. You support Hindi and English.
You follow WHO, ASHA, and MoHFW clinical guidelines strictly."""

    clinical_rules = """
CLINICAL RULES:
1. NEVER diagnose definitively — say "This may be..." or "Yeh... ho sakta hai"
2. ALWAYS recommend seeing a doctor for anything beyond minor symptoms
3. For Critical/High risk — URGENTLY push for 108 or hospital
4. Keep responses SHORT (3-5 sentences max) — rural users have low bandwidth and literacy
5. End EVERY response with 1 concrete next step the user can take RIGHT NOW
6. Use simple words — no medical jargon
7. In Hindi mode: use Hinglish (mix of Hindi + simple English medical terms)"""

    language_rule = (
        "RESPOND IN HINDI (Hinglish style — Hindi with simple English terms). "
        "Use Devanagari script if user used it, otherwise use Roman Hindi."
        if language == "hi"
        else "RESPOND IN ENGLISH. Keep language simple and clear."
    )

    urgency_rule = ""
    if risk_level == "Critical":
        urgency_rule = "\n⚠️ CRITICAL EMERGENCY DETECTED: Lead with emergency action (108 call). Be direct and urgent."
    elif risk_level == "High":
        urgency_rule = "\n⚠️ HIGH RISK: Strongly advise going to PHC/hospital TODAY. Be firm but calm."

    follow_up_instruction = (
        "\nAfter your response, ask 1-2 specific follow-up questions to better assess the situation."
        if turn_number <= 3
        else "\nYou have enough information. Focus on clear recommendations now."
    )

    return f"{base_identity}\n{language_rule}{urgency_rule}{clinical_rules}{follow_up_instruction}"


def run_health_agent(
    session_id: str,
    user_message: str,
    conversation_history: list[dict],
    language: Optional[str] = None,
    groq_api_key: str = ""
) -> dict:
    """
    Main health agent function. Runs one conversational turn.

    Args:
        session_id: Unique session identifier
        user_message: Current user input
        conversation_history: List of {role, content} dicts (prior messages)
        language: 'en' or 'hi' (auto-detected if None)
        groq_api_key: Groq API key

    Returns:
        {
            reply: str,
            risk_score: int,
            risk_level: str,
            follow_up_questions: list[str],
            actions: list[str],
            is_emergency: bool,
            language: str,
            should_escalate: bool
        }
    """
    # Auto-detect language if not specified
    if not language:
        language = detect_language(user_message)

    # Build full message history for this turn
    all_messages = conversation_history + [{"role": "user", "content": user_message}]
    turn_number = len([m for m in all_messages if m.get("role") == "user"])

    # Calculate current risk score from entire conversation
    risk_score, risk_level = calculate_risk_score(all_messages)

    # Emergency detection — override if critical keywords found
    emergency_detected = is_emergency(user_message)
    if emergency_detected:
        risk_score = max(risk_score, 90)
        risk_level = "Critical"

    # Get follow-up questions
    follow_up_questions = get_follow_up_questions(user_message, language, count=2)

    # Get recommended actions
    actions = get_recommended_actions(risk_level, language)

    # Determine if ASHA should be auto-alerted
    should_escalate = risk_level in ("Critical", "High") or emergency_detected

    # Build Groq messages
    system_prompt = build_agent_system_prompt(language, risk_level, turn_number)

    groq_messages = [{"role": "system", "content": system_prompt}]

    # Add conversation history (last 6 messages max for context window efficiency)
    for msg in conversation_history[-6:]:
        if msg.get("role") in ("user", "assistant"):
            groq_messages.append(msg)

    groq_messages.append({"role": "user", "content": user_message})

    # Call Groq LLM
    reply = _call_groq(groq_messages, groq_api_key, language, risk_level, emergency_detected)

    return {
        "reply": reply,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "follow_up_questions": follow_up_questions,
        "actions": actions,
        "is_emergency": emergency_detected,
        "language": language,
        "should_escalate": should_escalate,
        "turn_number": turn_number
    }


def _call_groq(messages: list[dict], groq_api_key: str, language: str, risk_level: str, emergency: bool) -> str:
    """Call Groq API with retry logic. Falls back to rule-based response if API fails."""
    if not groq_api_key or groq_api_key == "your_groq_api_key_here":
        return _fallback_response(language, risk_level, emergency)

    client = Groq(api_key=groq_api_key)
    max_retries = 3

    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                temperature=0.3,
                max_tokens=350,
                timeout=12
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"[HEALTH AGENT] Groq attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)

    return _fallback_response(language, risk_level, emergency)


def _fallback_response(language: str, risk_level: str, emergency: bool) -> str:
    """Rule-based fallback when Groq is unavailable."""
    if emergency:
        if language == "hi":
            return (
                "⚠️ EMERGENCY: Yeh ek aapaat sthiti lag rahi hai. ABHI 108 par call karein — "
                "yeh muft ambulance seva hai. Mariz ko hila-dolaen nahin. "
                "Main abhi AI se connect nahi ho pa raha, lekin 108 aapki turant madad karega."
            )
        return (
            "⚠️ EMERGENCY DETECTED: This appears to be a medical emergency. "
            "CALL 108 IMMEDIATELY — it's the free ambulance service. "
            "Keep the patient still and calm. I'm having connectivity issues but 108 will help right away."
        )

    if risk_level == "Critical":
        msg_hi = "Aapke lakshan gambhir hain. Turant najdiki sarkaari aspatal jayein ya 108 call karein. Deri bilkul mat karen."
        msg_en = "Your symptoms are serious. Please go to the nearest government hospital immediately or call 108. Do not delay."
    elif risk_level == "High":
        msg_hi = "Aapko aaj PHC ya doctor ke paas jana chahiye. ASHA didi ko bhi batayein. Paani peete rahen."
        msg_en = "You should visit a PHC or doctor today. Also inform your ASHA worker. Keep drinking fluids."
    elif risk_level == "Medium":
        msg_hi = "Aapko 24 ghante mein PHC jana chahiye. Ghar par aaram karen aur ORS peeyen. Agar takleef badhe to turant jayein."
        msg_en = "You should visit a PHC within 24 hours. Rest at home and drink ORS. Go immediately if symptoms worsen."
    else:
        msg_hi = "Aapki takleef abhi halki lag rahi hai. Ghar par aaram karen, saaf pani peeyen. 2 din mein theek na ho to ASHA didi se miilen."
        msg_en = "Your symptoms appear mild for now. Rest at home and drink clean water. If not improving in 2 days, consult your ASHA worker."

    return msg_hi if language == "hi" else msg_en
