const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const PORT = 5500;
__dirname = "C:/Users/medra/OneDrive/Área de Trabalho/web-e-comerce/"


app.use(bodyParser.urlencoded({ extended: false }));

app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "/css")));

app.get("/", (req, res) =>{
    res.render(__dirname + "/view/login.ejs");
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });