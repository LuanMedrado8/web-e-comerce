const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { User, createUser, getUserByEmail, getUserByUserName, findByUserNameAndUpdate, removeUser} = require('../models/User');
const { Product, getProductByProductId } = require('../models/Product');
const jwt = require('jsonwebtoken');
const stripe = require('../middlewares/stripe');
const { carrinho, createItemCarrinho, getCarrinho, removeProductFromCart, removeCart } = require('../models/carrinho');
const { createPedido, getPedidos} = require('../models/pedido');
const e = require('express');

router.post('/registro', [
    body('userName').notEmpty().withMessage('Nome de usuário é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('dataNascimento').isISO8601().withMessage('Data de nascimento inválida (formato ISO 8601)'),
    body('telefone').isMobilePhone().withMessage('Número de telefone inválido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password, email, dataNascimento, telefone } = req.body;
    

    try {
        // Verificar se o email já existe
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const existingUserName = await getUserByUserName(userName);
        if (existingUserName) {
            return res.status(400).json({ error: 'Nome de usuário já cadastrado' });
        }

        // Criar o usuário
        const user = await createUser(userName, password, email, dataNascimento, telefone);
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

router.post('/login', async (req, res) => {
    const { userName, password, rememberMe } = req.body;

    try {
        const user = await getUserByUserName(userName);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Senha inválida' });
        }

        // Gerar um token JWT
        const token = jwt.sign({ userId: user.userName }, 'seu_segredo_jwt', { expiresIn: '1h' });

        if (rememberMe) {
            res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 dias
        }

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, paymentMethodType } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: [paymentMethodType],
      });
  
      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/adicionar-ao-carrinho', async (req, res) => {
    const { productId, userName  } = req.body;
  
    try {
          const novoItem = await createItemCarrinho(productId, userName);
          res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso', novoItem});

    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
  });

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserByUserName(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

router.post('/buscar-carrinho', async (req, res) => {
    const { userName } = req.body;

    try {
        const carrinho = await getCarrinho(userName);
        if (!carrinho) {
            return res.status(404).json({ error: 'Carrinho não encontrado' });
        }
        res.status(200).json(carrinho);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
})

router.delete('/remover-do-carrinho/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(productId);

    try {
        const response = await carrinho.removeProductFromCart(productId);
        if (response) {
            res.status(200).json({ message: 'Produto removido do carrinho com sucesso' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado no carrinho' });
        }
    } catch (error) {
        console.error('Erro ao remover produto do carrinho:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

router.delete('/removerCarrinho/:id', async (req, res) => {
    const userName = req.params.id;
    console.log(userName);

    try {
        const response = await carrinho.removeCart(userName);
        console.log(response);
        if (response) {
            res.status(200).json({ message: 'Carrinho removido com sucesso' });
        } else {
            res.status(404).json({ error: 'Carrinho não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao remover carrinho:', error);
        res.status(500).json({ error: 'Erro interno ao processar a requisição' });
    }
});

router.get('/product/:id', async (req, res) => {
    const productId = req.params.id;


    try {
        const product = await getProductByProductId(productId);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
});

router.post('/criarPedido', async (req, res) => { 
    const { userName, totalValue } = req.body;
    try {
        // Criar o pedido
        const pedido = await createPedido(userName, totalValue);
        res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
});

router.get('/buscarPedidos/:id', async (req, res) => {
    const userName = req.params.id;

    try {
        const pedidos = await getPedidos(userName);
        if (!pedidos) {
            return res.status(404).json({ error: 'Pedidos não encontrados' });
        }
        res.status(200).json(pedidos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
});

router.put('/editarPerfil', [
    body('userName').notEmpty().withMessage('Nome de usuário é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('dataNascimento').isISO8601().withMessage('Data de nascimento inválida (formato ISO 8601)'),
    body('telefone').isMobilePhone().withMessage('Número de telefone inválido')
], async (req, res) => {
    const { userName, password, email, dataNascimento, telefone, oldUserName } = req.body;

    try {
        const user = await User.findByUserNameAndUpdate(userName, password, email, dataNascimento, telefone, oldUserName );
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

router.delete('/removerUsuario', async (req, res) => {
    const userName = req.body.userName;

    try {
        const user = await User.removeUser(userName);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover usuário' });
    }
});

module.exports = router;
