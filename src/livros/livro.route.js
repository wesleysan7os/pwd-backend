const express = require('express');
const router = new express.Router();
const livros = require('./livros.json');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    let livrosArray = livros;
    res.json(livrosArray);
});

router.get('/:id', (req, res) => {
    const livro = encontraLivro(req.params.id);

    if (livro) {
        res.status(200).json(livro);
    } else {
        res.status(404).json(`Livro com o id ${req.params.id} não encontrado.`);
    }
});

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

    return res.status(200).json(`Livro ${livro.nome} criado!`);
});

router.put('/:id', (req, res) => {
    const livro = encontraLivro(req.params.id);

    if (livro) {
        livro.nome = req.body.nome;
        livro.autor = req.body.autor;
        livro.valor = req.body.valor;
        livro.edicao = req.body.edicao;
        livro.editora = req.body.editora;
        livro.volume = req.body.volume;

        return res.status(200).json(`Livro "${livro.nome}" atualizado!`);

    } else {
        return res.status(404).json(`Livro com o id ${req.params.id} não existe.`);
    }
});

router.delete('/:id', (req, res) => {
    const livro = encontraLivro(req.params.id);

    if (livro) {
        const indiceLivro = livros.indexOf(livro);
        livros.splice(indiceLivro, 1);
        return res.status(200).json(`Livro "${livro.nome}" deletado!`);

    } else {
        return res.status(404).json(`Livro com o id ${req.params.id} não existe.`);
    }
});

function encontraLivro(idLivro) {
    const livro = livros.find((item) => item.id === parseInt(idLivro));
    return livro;
}

module.exports = router;