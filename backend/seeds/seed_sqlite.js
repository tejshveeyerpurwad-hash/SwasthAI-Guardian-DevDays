import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MockDB from '../db.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateDemoData() {
  console.log('🌱 Starting SwasthAI Guardian Demo Data Generation...');
  const db = new MockDB();
  
  // Wait a brief moment to ensure DB init finishes (MockDB handles this internally, but safe approach)
  await new Promise(r => setTimeout(r, 1000));

  console.log('Creating 25 Villages...');
  const villageNames = ['Palghar-1', 'Dahanu-East', 'Wada-North', 'Jawhar-Central', 'Vikramgad-South'];
  for (let i = 0; i < 25; i++) {
    const vName = villageNames[i % villageNames.length] + '-' + i;
    await db.run(
      `INSERT INTO village_health (villageId, name, population, pregnant_women, children_under_5, malnutrition_cases, asha_contact) 
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(villageId) DO NOTHING`,
      [`V-${100+i}`, vName, Math.floor(Math.random() * 5000) + 1000, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 200) + 50, Math.floor(Math.random() * 20), '9876543210']
    );
  }

  console.log('Creating Admin & ASHA users...');
  const defaultPassword = await bcrypt.hash('admin123', 10);
  await db.run(`INSERT INTO users (phone, username, name, password, role, villageId) VALUES (?, ?, ?, ?, ?, ?)`, ['admin', 'admin', 'District Admin', defaultPassword, 'admin', 'ALL']);
  await db.run(`INSERT INTO users (phone, username, name, password, role, villageId) VALUES (?, ?, ?, ?, ?, ?)`, ['ngo', 'ngo_officer', 'NGO Coordinator', defaultPassword, 'ngo', 'ALL']);
  await db.run(`INSERT INTO users (phone, username, name, password, role, villageId) VALUES (?, ?, ?, ?, ?, ?)`, ['asha', 'sunita_devi', 'Sunita Devi', defaultPassword, 'asha', 'V-100']);
  await db.run(`INSERT INTO users (phone, username, name, password, role, villageId) VALUES (?, ?, ?, ?, ?, ?)`, ['villager', 'ramesh', 'Ramesh', defaultPassword, 'villager', 'V-100']);

  console.log('Generating 1000 Mock Patients...');
  for (let i = 0; i < 1000; i++) {
    // We won't insert 1000 users to save time, but we will insert symptoms
    if (i % 200 === 0) console.log(`... ${i} patients processed`);
    const village = `V-${100 + (i % 25)}`;
    const disease = ['Viral Fever & Cold', 'Malaria', 'Dengue', 'Typhoid', 'Urinary Tract Infection (UTI)'][Math.floor(Math.random() * 5)];
    await db.run('INSERT INTO symptoms (userId, villageId, symptoms, prediction) VALUES (?, ?, ?, ?)', [1, village, 'Fever, cough, body pain', `${disease} - Reliable Advice: Rest and hydrate.`]);
  }

  console.log('Generating 250 Pregnancies...');
  for (let i = 0; i < 250; i++) {
    const riskLevels = ['Low Risk', 'Low Risk', 'Low Risk', 'Mid Risk', 'High Risk'];
    const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const village = `V-${100 + (i % 25)}`;
    await db.run('INSERT INTO pregnancy_data (name, age, trimester, dueDate, riskLevel, villageId) VALUES (?, ?, ?, ?, ?, ?)', [`Mother-${i}`, Math.floor(Math.random() * 15) + 20, (i % 3) + 1, '2026-08-15', risk, village]);
  }

  console.log('Generating 50 Emergencies...');
  const emergencies = ['Cardiac Arrest', 'Snake Bite', 'Severe Bleeding', 'Maternal Complication', 'Burn Injury'];
  for (let i = 0; i < 50; i++) {
    const village = `V-${100 + (i % 25)}`;
    const eType = emergencies[Math.floor(Math.random() * emergencies.length)];
    const status = ['pending', 'dispatched', 'resolved'][Math.floor(Math.random() * 3)];
    await db.run('INSERT INTO ambulance_requests (user_id, name, location, priority, symptoms, status) VALUES (?, ?, ?, ?, ?, ?)', [1, `Victim-${i}`, village, 'Critical', eType, status]);
  }

  console.log('✅ Demo Data Seeded Successfully! The database is now ready for presentation.');
}

generateDemoData().catch(console.error);
