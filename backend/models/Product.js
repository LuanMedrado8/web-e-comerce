const pool = require('../db');

class Product {
  constructor(productName, oldPrice, price, plataform, imagemUrl) {
    this.productName = productName;
    this.oldPrice = oldPrice;
    this.price = price;
    this.plataform = plataform;
    this.imagemUrl = imagemUrl;
  }




  
  static async getProductByProductId(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const product = result.rows[0];
    if (product) {
        return new Product(product.productname, product.oldprice, product.price, product.plataform, product.imagemurl);
    }
    return null;
  }

static async getAllProducts() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

}

module.exports = {
    Product,
    getProductByProductId: Product.getProductByProductId,
    getAllProducts: Product.getAllProducts
  };
