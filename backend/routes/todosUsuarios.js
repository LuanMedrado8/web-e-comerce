const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

module.exports = router;