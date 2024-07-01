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

  static async removeProductFromCart(productId) {
    const response = await pool.query('DELETE FROM carrinho WHERE product_id = $1', [productId]);
    return response.rowCount > 0;
  }

  static async removeCart(userName) {
    const response = await pool.query('DELETE FROM carrinho WHERE username = $1', [userName]);
    return response.rowCount > 0;
  }
  
}

module.exports = {
    carrinho,
    createItemCarrinho: carrinho.createItemCarrinho,
    getCarrinho: carrinho.getCarrinho,
    removeProductFromCart: carrinho.removeProductFromCart,
    removeCart: carrinho.removeCart
  };