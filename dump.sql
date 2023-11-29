CREATE TABLE usuarios (
    id serial primary key,
    username text unique not null,
    email text unique,
    senha text not null,
    imagem text,
    site text,
    bio text,
    telefone text,
    genero text,
    verificado boolean
);


CREATE TABLE postagens (
    id serial primary key,
    usuario_id int references usuarios(id),
    data timestamp default now();
    legenda text
);

CREATE TABLE postagem_fotos (
    id serial primary key,
    postagem_id int references postagens(id),
    imagem text
);

CREATE TABLE postagem_curtidas (
    id serial primary key,
    usuario_id int references usuarios(id),
    data timestamp default now(),
);

CREATE TABLE postagem_comentarios (
    id serial primary key,
    postagem_id int references postagens(id),
    usuario_id int references usuarios(id),
    data timestamp default now(),
    comentario text not null

);