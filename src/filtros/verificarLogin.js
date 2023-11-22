const jwt = require('jsonwebtoken');
const knex = require('../filtros/conexão');
const dotenv = require('dotenv').config();

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return  res.status(401).json("Usuario não autorizado");
    }

    try {

        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT || JWT);

        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if(!usuarioExiste) {
            return res.status(404).json("Token inválido");
        }

        const { senha, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next()

    } catch(error) {
        return res.status(400).json(error.message)
    }
}

module.exports = verificarLogin