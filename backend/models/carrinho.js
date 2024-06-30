const pool = require('../db');

class carrinho {
    constructor(userName, productId, quantity) {
      this.userName = userName;
      this.productId = productId;
      this.quantity = quantity;
    }




  
  static async getItembyProductId(productId) {
    const result = await pool.query('SELECT * FROM carrinho WHERE product_id = $1', [productId]);
    const product = result.rows[0];
    if (product) {
        return new carrinho(product.userName, product.productId, product.quantity);
    }
    return null;
  }

static async createItemCarrinho(productId, quantity, userName) {
    await pool.query('INSERT INTO carrinho (product_id, quantity, username) VALUES ($1, $2, $3)', [productId, quantity, userName]);
  }

    static async atualizarItemCarrinho(quantity, productId) {
        await pool.query('UPDATE carrinho SET quantity = $1 WHERE id = $2', [quantity, productId]);
    }

}

module.exports = {
    carrinho,
    getItembyProductId: carrinho.getItembyProductId,
    createItemCarrinho: carrinho.createItemCarrinho,
    atualizarItemCarrinho: carrinho.atualizarItemCarrinho
  };