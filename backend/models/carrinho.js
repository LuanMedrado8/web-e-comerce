const pool = require('../db');

class carrinho {
    constructor(userName, productId) {
      this.userName = userName;
      this.productId = productId;
    }

static async createItemCarrinho(productId, userName) {
    await pool.query('INSERT INTO carrinho (product_id, username) VALUES ($1, $2)', [productId, userName]);
  }

  static async getCarrinho(userName) {
    const carrinho = await pool.query('SELECT product_id FROM carrinho WHERE username = $1', [userName]);
    return carrinho.rows;
  }
  
}

module.exports = {
    carrinho,
    createItemCarrinho: carrinho.createItemCarrinho,
    getCarrinho: carrinho.getCarrinho
  };