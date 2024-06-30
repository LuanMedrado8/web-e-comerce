const pool = require('../db');
const bcrypt = require('bcrypt');

class User {
  constructor(userName, password, email, dataNascimento, telefone, imagem) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.telefone = telefone;
    this.imagem = imagem;

  }

  // Método de instância para comparar senhas
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Método estático para criar um novo usuário
  static async createUser(userName, password, email, dataNascimento, telefone, imagem) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, email, datanascimento, telefone, imagem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userName, hashedPassword, email, dataNascimento, telefone, imagem]
    );
    const user = result.rows[0];
    return new User(user.username, user.password, user.email, user.datanascimento, user.telefone, user.imagem);
  }

  // Método estático para obter um usuário pelo email
  static async getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user) {
      return new User(user.username, user.password, user.email, user.datanascimento, user.telefone, user.imagem);
    }
    return null;
  }

  // Método estático para obter um usuário pelo nome de usuário
  static async getUserByUserName(userName) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
    const user = result.rows[0];
    if (user) {
      return new User(user.username, user.password, user.email, user.datanascimento, user.telefone, user.imagem);
    }
    return null;
  }

}

module.exports = {
  User,
  createUser: User.createUser,
  getUserByEmail: User.getUserByEmail,
  getUserByUserName: User.getUserByUserName,
};
