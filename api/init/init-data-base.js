const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
  const db = new sqlite3.Database('./database.sqlite');

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE,
            birthdate DATE,        
            location TEXT,
            avatar TEXT DEFAULT NULL, 
            cover TEXT DEFAULT NULL
        )`);

    db.get('SELECT COUNT(*) AS count FROM user', (err, row) => {
      if (!row.count) {
        db.run(
          'INSERT INTO user (username, email, phone, birthdate, location, avatar, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
          ['johnsonwong', '1067100250@qq.com', '12345678944', '1998-06-15', 'Shanghai, China'],
        );
      }
    });
  });
}

module.exports = initializeDatabase;
