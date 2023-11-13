// src/database/db.js
const sqlite3 = require('sqlite3').verbose();

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('Roxiler.db');

    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, title TEXT, description TEXT, price REAL, dateOfSale TEXT)');

      // Insert seed data logic here...

      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

module.exports = { initializeDatabase };
