const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { User, getUserByUserName } = require('../models/User');
const jwt = require('jsonwebtoken');

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
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const existingUserName = await User.getUserByUserName(userName);
        if (existingUserName) {
            return res.status(400).json({ error: 'Nome de usuário já cadastrado' });
        }

        // Criar o usuário
        const user = await User.createUser(userName, password, email, dataNascimento, telefone);
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

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
        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;