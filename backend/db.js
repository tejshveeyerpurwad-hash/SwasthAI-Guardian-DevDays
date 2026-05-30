class InMemoryDB {
  constructor() {
    this.tables = {};
  }
  async exec(sql) {
    // Simple parser for CREATE TABLE statements to initialize in-memory tables
    const createMatch = sql.match(/CREATE TABLE IF NOT EXISTS (\w+) \(([^;]+)\)/i);
    if (createMatch) {
      const tableName = createMatch[1];
      if (!this.tables[tableName]) {
        this.tables[tableName] = [];
      }
    }
    return;
  }
  async run(sql, params = []) {
    // Very naive handling for INSERT statements
    const insertMatch = sql.match(/INSERT INTO (\w+) \(([^)]+)\) VALUES \(([^)]+)\)/i);
    if (insertMatch) {
      const table = insertMatch[1];
      const columns = insertMatch[2].split(',').map(c => c.trim());
      const values = params;
      const row = {};
      columns.forEach((col, idx) => {
        row[col] = values[idx];
      });
      if (!this.tables[table]) this.tables[table] = [];
      this.tables[table].push(row);
      return { lastID: this.tables[table].length };
    }
    // For UPDATE/DELETE just noop
    return {};
  }
  async get(sql, params = []) {
    // Very naive SELECT handling for primary key lookups
    const selectMatch = sql.match(/SELECT \* FROM (\w+) WHERE (\w+) = \?/i);
    if (selectMatch) {
      const table = selectMatch[1];
      const column = selectMatch[2];
      const value = params[0];
      const rows = this.tables[table] || [];
      return rows.find(r => r[column] === value) || null;
    }
    return null;
  }
  async all(sql, params = []) {
    // Very naive handling for SELECT * FROM table
    const selectAllMatch = sql.match(/SELECT \* FROM (\w+)/i);
    if (selectAllMatch) {
      const table = selectAllMatch[1];
      return this.tables[table] || [];
    }
    return [];
  }
}

const dbInstance = new InMemoryDB();
export default dbInstance;
