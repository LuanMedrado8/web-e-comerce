const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Rota de cadastro
router.post('/registro', async (req, res) => {
    body('userName').notEmpty().withMessage('Nome de usuário é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('dataNascimento').isISO8601().withMessage('Data de nascimento inválida (formato ISO 8601)'),
    body('telefone').isMobilePhone().withMessage('Número de telefone inválido'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { userName, email, password, dataNascimento, telefone } = req.body;
  
      try {
        // Verificar se o email já existe
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({ error: 'Email já cadastrado' });
        }
  
        // Criar o usuário (com todos os atributos)
        const user = await User.createUser(userName, email, password, dataNascimento, telefone);
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
      }
    }
});

// Rota de login
router.post('../../view/login', async (req, res) => {
  // Lógica de login (validação, comparação de senha, geração de token, etc.)
});

module.exports = router;