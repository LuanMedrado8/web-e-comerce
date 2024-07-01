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

  // Método estático para criar um novo usuário
  static async createUser(userName, password, email, dataNascimento, telefone) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, email, datanascimento, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userName, hashedPassword, email, dataNascimento, telefone]
    );
    const user = result.rows[0];
    return new User(user.username, user.password, user.email, user.datanascimento, user.telefone);
  }

  // Método estático para obter um usuário pelo email
  static async getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user) {
      return new User(user.username, user.password, user.email, user.datanascimento, user.telefone);
    }
    return null;
  }

  // Método estático para obter um usuário pelo nome de usuário
  static async getUserByUserName(userName) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
    const user = result.rows[0];
    if (user) {
      return new User(user.username, user.password, user.email, user.datanascimento, user.telefone);
    }
    return null;
  }

  static async findByUserNameAndUpdate(userName, password, email, dataNascimento, telefone, oldUserName) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'UPDATE users SET username = $1, password = $2, email = $3, datanascimento = $4, telefone = $5 WHERE username = $6 RETURNING *',
            [userName, hashedPassword, email, dataNascimento, telefone, oldUserName]
        );
        const user = result.rows[0];
        console.log(user);
        if (user) {
            return new User(user.username, user.password, user.email, user.datanascimento, user.telefone);
        }
        return null;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

static async removeUser(userName) {
    const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING *', [userName]);
    const user = result.rows[0];
    if (user) {
        return new User(user.username, user.password, user.email, user.datanascimento, user.telefone);
    }
    return null;

} 
}

module.exports = {
  User,
  createUser: User.createUser,
  getUserByEmail: User.getUserByEmail,
  getUserByUserName: User.getUserByUserName,
  findByUserNameAndUpdate: User.findByUserNameAndUpdate,
  removeUser: User.removeUser
};
