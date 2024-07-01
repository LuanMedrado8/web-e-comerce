const pool = require('../db');

class Pedido {
    constructor(userName, totalValue) {
        this.userName = userName;
        this.totalValue = totalValue;
    }
    
    static async createPedido(userName, totalValue) {
        const result = await pool.query('INSERT INTO pedidos (username, totalvalue) VALUES ($1, $2)', [userName, totalValue]);
        const pedido = result.rows[0];
        if (pedido) {
            return new Pedido(pedido.username, pedido.totalValue);
        }

    }    

    static async getPedidos(userName) {
        const pedidos = await pool.query('SELECT * FROM pedidos WHERE username = $1', [userName]);
        return pedidos.rows;
    }

    }

    module.exports = {
        Pedido,
        createPedido: Pedido.createPedido,
        getPedidos: Pedido.getPedidos
      };