const knex = require('../filtros/conexão');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const login = async (req, res) => {
    const { username, senha } = req.body;

    if(!username || !senha) {
        return res.status(404).json('É obrigatório username e senha!')
    }

    try {

        const usuario = await knex('usuarios').where({ username }).first();

        if(!usuario) {
            return res.status(404).json({ mensagem: "Usuario ou senha invalida!"})
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCorreta) {
            return res.status(400).json({
                mensagem: "Email ou senha invalida!"
            })
        }

        const dadosTokenUser = {
            id: usuario.id,
            username: usuario.username
        }

        const token = jwt.sign(dadosTokenUser, process.env.JWT || JWT, {expiresIn: '8h'}) ;

        const { senha: _, ...dadosUsuario } = usuario;


        return res.status(200).json({usuario: dadosUsuario, token})

    } catch(error) {

        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor!" })
    }
}

module.exports = {
    login
}