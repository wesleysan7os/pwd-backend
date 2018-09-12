const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.get('/', function (req, res) {
  res.send(JSON.stringify({
    mensagem: "Bem-vindo a Biblioteca Virtual!"
  }))
});

const livroRoute = require('./livros/livro.route.js');
//const usuarioRoute = require('./usuarios/usuario.route.js');
//const compraRoute = require('./compras/compra.route.js');

app.use('/livro', livroRoute);
//app.use('/usuario', usuarioRoute);
//app.use('/compra', compraRoute);

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  //next(); //sem o next, a chamada para aqui
});

// faz o parse de requisições com o corpo do tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// faz o parse de requisições com o corpo do tipo application/json
app.use(bodyParser.json());

app.listen(3000, () => console.log('PDW backend listening on port 3000!'))

module.exports = app;