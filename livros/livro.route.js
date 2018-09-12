const express = require('express');
const router = new express.Router();
//const livros = require('./livros.json');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    let livrosArray = livros;
    res.json(livrosArray);
});

router.get('/:id', (req, res) => {
    const livro = encontraLivros(req.params.id);
    if(livro) {
        res.status(200).json(livro); 
    } else {
        res.status(404).json(`Livro com o id ${req.params.id} não encontrado.`);
    }
});

function encontraLivros(idLivro) {
    const livro = livros.find((item) => item.id === parseInt(idLivro));
    return livro;
}

router.post('/', (req, res) => {
    const livro = {
        'id': livros.length + 1,
        'nome': req.body.nome,
        'autor': req.body.autor,
        'valor': req.body.valor,
        'edicao': req.body.edicao,
        'editora': req.body.editora,
        'volume': req.body.volume,
    };

    livros.push(livro);
    
    return res.status(200).json('Livro ${livro.name} criado!');
});

