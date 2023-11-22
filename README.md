# Nosso Mini Insta

## O que o usuario pode fazer

- Fazer Login
- Fazer Cadastro
- Ver os dados do seu perfil
- Editar dados do seu perfil
- Ver postagens de outros users
    - Ver quantidade de curtidas em uma publicação
    - Ver comentarios de uma publicação
- Curtir publicações
- Comentar em uma publicação
- Deletar comentario

## O que o usuario não pode fazer

- Ver a localização de uma postagem
- Ver as pessoas que curtiram a postagem
- Curtir comentarios
- Comentar em outros comentarios
- Editar comentarios
- Deletar comentarios de outros users


## Endpoints

### POST - Login

#### Dados enviados

- Username
- Senha

#### Dados retornados

- Sucesso / erro
- Token

#### Objetivos gerais

- Validar username e senha
- Buscar o usuario no banco de dados
- Verificar se a senha informada esta correta
- Gerar o token de auteticação
- Retornar os dados do usuario e o token

---

### POST - Cadastro


#### Dados enviados

- Username
- Senha

#### Dados retornados

- Sucesso / erro

####  Objetivos gerais

- Validar username e a senha
- Verificar se o username ja exite no database
- Criptografar a senha pra salvar a hast da senha
- Cadastrar o usuario no database
- Retornar sucesso ou erro

---

### GET - Perfil

#### Dados enviados

- Token (Que tera id ou username)

#### Dados retornados

- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Objetivos gerais

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
- Retornar os dados do usuario

---

### PUT - Perfil

#### Dados enviados

- Token (Que tera id ou username)

- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero
- Senha

#### Dados retornados

- Sucesso / erro

#### Objetivos gerais

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
- Exigir ao menos um campo para atualizar
- Criptografar a senha se for informada
- Verificar se o email e o username ja existe no database se for informado
- Atualizar o registro do usuario no database
- Retornar sucesso ou erro 

---

### POST - Postagem

#### Dados enviados

- Token
- Texto
- array com fotos

#### Dados retornados

- sucesso / erro

#### Objetivos gerais

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
- Exigir que seja informado ao menos uma foto no array
- Cadastrar postagem para o usuario logado
- Cadastro das fotos da postagem
- Retornar sucesso ou erro 

---

### POST - Curtir

#### Dados enviados

- Token (Contem username ou id do usuario)
- id da postagem

#### Dados retornados

- Sucesso / erro

#### Objetivos gerais

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuario ja curtiu a postagem
- Cadastrar a curtida da postagem no database
- Retornar sucesso ou erro


---

### POST - comentar

#### Dados enviados

- Token (id do usuario)
- id da postagem
- texto do comentario

#### Dados recebidos

- Sucesso / erro

#### Objetivos gerais 

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
- Validar o texto
- Buscar a postagem pelo id informado
- Cadastrar comentario da postagem
- Retornar sucesso ou erro

### DELETE - comentar

#### Dados enviados

- Token (id do usuario)
- id da postagem

#### Dados recebidos

- Sucesso / erro

#### Objetivos gerais

- Validar o token do usuario
- Buscar o cadastro do usuario com a informação do token (id/username)
