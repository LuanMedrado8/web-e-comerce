const pool = require('../db');
const bcrypt = require('bcrypt');

class User {
  constructor(userName, password, email, dataNascimento, telefone) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.telefone = telefone;
  }

  // Método de instância para comparar senhas
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

// Função para criar um novo usuário
const createUser = async (userName, password, email, dataNascimento, telefone) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (userName, password, email, dataNascimento, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userName, hashedPassword, email, dataNascimento, telefone]
  );
  const user = result.rows[0];
  return new User(user.userName, user.password, user.email, user.dataNascimento, user.telefone);
};

// Função para obter um usuário pelo email
const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (user) {
    return new User(user.userName, user.password, user.email, user.dataNascimento, user.telefone);
  }
  return null;
};

// Função para obter um usuário pelo nome de usuário
const getUserByUserName = async (userName) => {
  const result = await pool.query('SELECT * FROM users WHERE userName = $1', [userName]);
  const user = result.rows[0];
  if (user) {
    return new User(user.userName, user.password, user.email, user.dataNascimento, user.telefone);
  }
  return null;
};

module.exports = {
  User,
  createUser, 
  getUserByEmail,
  getUserByUserName,
};
