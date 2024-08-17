const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// 打开SQLite数据库
const db = new sqlite3.Database('./database.sqlite');

// 获取用户信息
/* eslint-disable */
router.get('/get-profile', (req, res) => {
  // 固定id 1
  db.get('SELECT * FROM user WHERE id = 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ user: row });
  });
});

// 修改用户信息
/* eslint-disable */
router.post('/edit-profile', (req, res) => {
  const { id, username, email, phone, birthdate, location, cover, avatar } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // 构建动态 SQL 查询
  let query = 'UPDATE user SET ';
  const params = [];

  // 动态添加需要更新的字段
  if (username !== undefined) {
    query += 'username = ?, ';
    params.push(username);
  }
  if (email !== undefined) {
    query += 'email = ?, ';
    params.push(email);
  }
  if (phone !== undefined) {
    query += 'phone = ?, ';
    params.push(phone);
  }
  if (birthdate !== undefined) {
    query += 'birthdate = ?, ';
    params.push(birthdate);
  }
  if (location !== undefined) {
    query += 'location = ?, ';
    params.push(location);
  }
  if (cover !== undefined) {
    query += 'cover = ?, ';
    params.push(cover);
  }
  if (avatar !== undefined) {
    query += 'avatar = ?, ';
    params.push(avatar);
  }

  // 移除最后一个逗号和空格
  query = query.slice(0, -2);

  // 添加 WHERE 子句
  query += ' WHERE id = ?';
  params.push(id);

  // 执行查询
  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User updated successfully' });
  });
});

module.exports = router;
