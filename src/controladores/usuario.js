const knex = require("../filtros/conexão");
const bcrypt = require('bcrypt')


const cadastrarUser = async (req, res) => {
    const { username, senha } = req.body;

    if (!username) {
        return res.json(404).json("O campo username é obrigatório!");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório!")
    }

    if (senha.length < 5) {
        return res.status(404).json("A senha precisa conter, no minimo 5 caracteres")
    }

    try {

        const quantidadeUsuarios = await knex('usuarios').where({ username }).first();

        if (quantidadeUsuarios) {
            return res.status(400).json("Username informado ja existe!")
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUser = await knex('usuarios').insert({ username, senha: senhaCriptografada });

        if (!novoUser) {
            return res.status(400).json("O usuario não foi cadastrado!")
        }

        return res.status(200).json("Usuario cadastrado com sucesso.")


    } catch (error) {

        // console.log(error)
        return res.status(400).json(error.message)
    }
}

const obterPerfil = async (req, res) => {
    console.log(req.usuario)

    return res.status(200).json(req.usuario)
}

const atualizrPerfil = async (req, res) => {
    let {
        nome,
        email,
        senha,
        imagem,
        username,
        site,
        bio,
        telefone,
        genero
    } = req.body;

    const { id } = req.usuario;

    if (!nome && !email && !senha && !imagem && !username && !site && !telefone && !bio && !genero) {
        return res.status(400).json("É obrigatorio informar ao menos um campo para atualização");
    }

    try {

        if (senha) {
            if (senha.length < 5) {
                return res.status(404).json("A senha deve conter, no minimo 5 caracteres.")

            }

            senha = await bcrypt.hash(senha, 10)
        }

        if (email != req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where({ email }).first();

            if (emailUsuarioExiste) {
                return res.status(404).json('Email ja existe.')
            }
        }

        if (username != req.usuario.username) {
            const usernameExiste = await knex('usuarios').where({ username }).first();

            if (usernameExiste) {
                return res.status(404).json('Username ja existe.')
            }
        }

        const usuarioAtualizado = await knex('usuarios')
            .where({ id })
            .update({
                nome,
                email,
                senha,
                imagem,
                username,
                site,
                bio,
                telefone,
                genero
            })

        if(!usuarioAtualizado) {
            return res.status(404).json("Usuario não foi atualizado");
        }

        return res.status(200).json("Usuario atualizado com sucesso.")

    } catch (error) {
        res.status(400).json(error.message)
    }


}


module.exports = {
    cadastrarUser,
    obterPerfil,
    atualizrPerfil
}