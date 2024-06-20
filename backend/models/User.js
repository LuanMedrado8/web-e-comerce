const pool = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (userName, password, email, dataNascimento, telefone) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (userName, password, email, dataNascimento, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userName, hashedPassword, email, dataNascimento, telefone]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail };
