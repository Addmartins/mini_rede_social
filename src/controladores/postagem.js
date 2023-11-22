const knex = require('../filtros/conexão');

const novaPostagem = async (req, res) => {
    const { id } = req.usuario;
    const { legenda, fotos } = req.body;

    if (!fotos || fotos.length == 0) {
        return res.status(404).json({
            mensagem: "É preciso enviar ao menos uma foto."
        });
    }

    try {

        const postagem = await knex('postagens')
            .insert({ legenda, usuario_id: id }).returning("*");

        if (!postagem) {
            return res.status(400).json("Não foi possivel concluir a postagem.");
        }


        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id;
        }

        const fotosCadastradas = await knex('postagem_fotos').insert(fotos).returning('*');

        if (!fotosCadastradas) {
            await knex('postagens').where({ id: postagem[0].id }).del();

            return res.status(400).json("Não foi possivel concluir a postagem.")
        }

        return res.status(200).json("Postagem realizada com sucesso.")

    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.massege)
    }
}

const curtir = async (req, res) => {
    const { id } = req.usuario;
    const { postagemId } = req.params;

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(404).json("Postagem não encontrada.")
        }

        const jaCurtiu = await knex('postagem_curtidas')
            .where({ usuario_id: id, postagem_id: postagem.id }).first();

        if (jaCurtiu) {
            return res.status(404).json('O usuario ja curtiu essa postagem.');
        }

        const curtida = await knex('postagem_curtidas').insert({
            usuario_id: id,
            postagem_id: postagem.id
        });

        if (!curtida) {
            return res.status(400).json("Não foi possivel curtir esta postagem.");
        }

        return res.status(200).json("Postagem curtida com sucesso.");

    } catch (error) {
        return res.status(400).json(error.message);

    }
}

const comentar = async (req, res) => {
    const { id } = req.usuario;
    const { postagemId } = req.params;
    const { comentario } = req.body;

    if (!comentario) {
        return res.status(404).json("O comentario não pode estar vazio.")
    }

    try {

        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(400).json("Postagem não encontrada.");
        }

        const cadastrarComentario = await knex("postagem_comentarios")
            .insert({
                postagem_id: postagemId,
                usuario_id: id,
                comentario
            }).returning('*');

        if (!cadastrarComentario) {
            return res.status(404).json("Falha ao fazer o comentario.")
        }

        return res.status(200).json("Comentario postado com sucesso.")

    } catch (error) {
        return res.status(404).json(error.message)
    }


}

const feed = async (req, res) => {
    const { id } = req.usuario;
    const { offset } = req.query;

    const o = offset ? offset : 0;

    try {
        // const postagens = await knex("postagens").limit(10).offset(o);

        const postagens = await knex("postagens")
            .where('usuario_id', '!=', id)
            .limit(10)
            .offset(o);

        if (postagens.length === 0) {
            return res.status(200).json(postagens)
        }

        for (const postagem of postagens) {
            //usuario
            const usuario = await knex('usuarios')
                .where({ id: postagem.id })
                .select('imagem', 'username', 'verificado')
                .first();

            postagem.usuario = usuario;

            //fotos
            const fotos = await knex('postagem_fotos')
                .where({ postagem_id: postagem.id })
                .select('imagem');

            postagem.fotos = fotos;

            //curtidas
            const curtidas = await knex('postagem_curtidas')
                .where({ postagem_id: postagem.id })
                .select('usuario_id');

            postagem.curtidas = curtidas.length;

            //curtido por min

            postagem.curtidoPorMim = curtidas.find(
                curtida => curtida.usuario_id == id
            ) ? true : false;

            //comentarios

            const comentarios = await knex('postagem_comentarios')
            .leftJoin('usuarios', 'usuarios.id', 'postagem_comentarios.usuario_id')
            .where({ postagem_id: postagem.id })
            .select('usuarios.username', 'postagem_comentarios.comentario')

            postagem.comentario = comentarios;

        }

    return res.status(200).json(postagens)


    } catch (error) {
        return res.status(404).json(error.massege)
    }
}

module.exports = {
    novaPostagem,
    curtir,
    comentar,
    feed
}