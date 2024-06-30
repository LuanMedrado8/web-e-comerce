require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pool = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'view')));





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'home.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastro.html'));
});

app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'carrinho.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
});

app.get('/nintendo-page', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'nintendo-page.html'));
});

app.get('/paginaJogo', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'paginaJogo.html'));
});

app.get('/ps5-page', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'ps5-page.html'));
});

app.get('/xbox-page', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'xbox-page.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'paginaPerfil.html'));
});

app.get('/pagamento', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'pagamento.html'));
});

app.get('/confirmacao', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'compraFinalizada.html'));
});

app.use('/auth', authRoutes);

pool
  .query('SELECT NOW()')
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); 
  });