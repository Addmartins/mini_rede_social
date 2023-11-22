const express = require('express');
const usuario = require('../controladores/usuario');
const login = require('../controladores/login');
const postagem = require('../controladores/postagem')
const verificaLogin = require('../filtros/verificarLogin');

const rotas = express.Router();

//cadastro de user
rotas.post('/cadastro', usuario.cadastrarUser);

//login
rotas.post('/login', login.login);

//auth
rotas.use(verificaLogin)

//Rotas user
rotas.get('/perfil', usuario.obterPerfil)

//Postagens
rotas.post('/postagens', postagem.novaPostagem);
rotas.post('/postagens/:postagemId/curtir', postagem.curtir);
rotas.post('/postagens/:postagemId/comentar', postagem.comentar);

rotas.get('/postagens', postagem.feed)



module.exports = {
    rotas
}