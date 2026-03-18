const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.db');

let db = null;

async function initDatabase() {
  const SQL = await initSqlJs();
  
  // Carregar banco existente ou criar novo
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Criar tabela de estudos
  db.run(`
    CREATE TABLE IF NOT EXISTS studies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('not_learned', 'learned_not_mastered', 'mastered')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  saveDatabase();
  return db;
}

function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

function getDatabase() {
  return db;
}

module.exports = { initDatabase, getDatabase, saveDatabase };
