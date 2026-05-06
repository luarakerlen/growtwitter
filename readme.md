# GrowTwitter API

API RESTful de uma rede social estilo Twitter desenvolvida em Node.js com Express, TypeScript, Prisma ORM e PostgreSQL.

## Objetivo do Projeto

O GrowTwitter permite que usuários se cadastrem, publiquem tweets, respondam a tweets, curtam publicações, sigam outros usuários e visualizem um feed personalizado. As funcionalidades incluem:

- **Cadastro e autenticação** de usuários com JWT
- **Publicação de tweets** (máximo 280 caracteres)
- **Respostas a tweets** (replies encadeados)
- **Curtidas** em tweets
- **Seguir/deixar de seguir** usuários
- **Feed personalizado** com tweets dos usuários seguidos (com paginação)
- **Gerenciamento de perfil** (atualizar dados e deletar conta)

---

## Tecnologias Utilizadas

| Tecnologia               | Descrição                      |
| ------------------------ | ------------------------------ |
| **Node.js**              | Runtime JavaScript             |
| **Express**              | Framework web                  |
| **TypeScript**           | Linguagem com tipagem estática |
| **Prisma**               | ORM para banco de dados        |
| **PostgreSQL**           | Banco de dados relacional      |
| **JSON Web Token (JWT)** | Autenticação stateless         |
| **bcrypt**               | Criptografia de senhas         |
| **Docker**               | Containerização                |
| **Swagger**              | Documentação da API            |
| **express-validator**    | Validação de dados             |
| **uuid**                 | Geração de identificadores únicos |

---

## Modelos de Dados

### User

| Campo       | Tipo      | Obrigatório | Descrição                       |
| ----------- | --------- | ----------- | ------------------------------- |
| `id`        | UUID      | Sim         | Identificador único             |
| `name`      | String    | Sim         | Nome completo (máx 200 chars)   |
| `username`  | String    | Sim         | Nome de usuário (único, máx 200)|
| `email`     | String    | Sim         | Email (único, máx 200)          |
| `password`  | String    | Sim         | Senha criptografada (máx 200)   |
| `photoUrl`  | String?   | Não         | URL da foto de perfil (máx 500) |
| `isActive`  | Boolean   | Sim         | Status do usuário (padrão: true)|
| `createdAt` | DateTime  | Sim         | Data de criação                 |
| `updatedAt` | DateTime  | Sim         | Data de atualização             |
| `deletedAt` | DateTime? | Não         | Data de exclusão (soft delete)  |

### Tweet

| Campo       | Tipo      | Obrigatório | Descrição                        |
| ----------- | --------- | ----------- | -------------------------------- |
| `id`        | UUID      | Sim         | Identificador único              |
| `content`   | String    | Sim         | Conteúdo do tweet (1-280 chars)  |
| `type`      | Enum      | Sim         | `POST` ou `REPLY`                |
| `authorId`  | UUID      | Sim         | ID do autor                      |
| `parentId`  | UUID?     | Não         | ID do tweet pai (se for resposta)|
| `createdAt` | DateTime  | Sim         | Data de criação                  |
| `updatedAt` | DateTime  | Sim         | Data de atualização              |

### Like

| Campo       | Tipo      | Descrição                       |
| ----------- | --------- | ------------------------------- |
| `userId`    | UUID      | ID do usuário que curtiu        |
| `tweetId`   | UUID      | ID do tweet curtido             |
| `createdAt` | DateTime  | Data da curtida                 |
| `updatedAt` | DateTime  | Data de atualização             |

### Follow

| Campo         | Tipo      | Descrição                       |
| ------------- | --------- | ------------------------------- |
| `followerId`  | UUID      | ID do seguidor                  |
| `followingId` | UUID      | ID do usuário seguido           |
| `createdAt`   | DateTime  | Data que começou a seguir       |
| `updatedAt`   | DateTime  | Data de atualização             |

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Porta do servidor
PORT=3030

# URL de conexão com o banco de dados
# Para Docker: postgresql://postgres:postgres@db:5432/meubancogrowtweeter?schema=public
# Para local/cloud: postgresql://usuario:senha@host:5432/banco
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meubancogrowtweeter?schema=public"

# Chave secreta para assinar tokens JWT (use uma string longa e aleatória)
JWT_SECRET="sua_chave_secreta_muito_segura_aqui"

# Tempo de expiração do token JWT (ex: 1h, 24h, 7d)
JWT_EXPIRES_IN="1h"
```

| Variável         | Obrigatório | Descrição                        |
| ---------------- | ----------- | -------------------------------- |
| `PORT`           | Não         | Porta do servidor (padrão: 3030) |
| `DATABASE_URL`   | Sim         | URL de conexão com PostgreSQL    |
| `JWT_SECRET`     | Sim         | Chave para assinar tokens JWT    |
| `JWT_EXPIRES_IN` | Sim         | Tempo de expiração do token      |

---

## Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

```bash
# Clonar o repositório
git clone https://github.com/luarakerlen/growtwitter.git
cd growtwitter

# Criar arquivo .env
cp .env.example .env
# Editar .env com suas configurações
```

### Com Docker (Recomendado)

```bash
# Construir e iniciar containers
docker compose up --build

# Execute as migrações do Prisma
docker compose exec app npx prisma migrate deploy

# A API estará disponível em http://localhost:3030
# Documentação Swagger em http://localhost:3030/docs
```

### Sem Docker (Desenvolvimento Local)

```bash
# Instalar dependências
npm install

# Configurar PostgreSQL localmente ou usar serviço cloud

# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Iniciar servidor
npm run dev
# A API estará disponível em http://localhost:3030
# Documentação Swagger em http://localhost:3030/docs
```

### Scripts Disponíveis

| Script            | Descrição                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Inicia em modo desenvolvimento com autoreload |
| `npm run build`   | Compila TypeScript para JavaScript            |
| `npm run start`   | Inicia servidor em produção                   |
| `npm run swagger` | Gera documentação Swagger                     |

---

## Rotas da Aplicação

### Health

| Método | Rota      | Descrição                           |
| ------ | --------- | ----------------------------------- |
| GET    | `/health` | Verificar se a API está funcionando |

### Auth (Públicas)

| Método | Rota          | Descrição                        |
| ------ | ------------- | -------------------------------- |
| POST   | `/auth/login` | Autenticar e obter token JWT     |

### Users

| Método | Rota          | Descrição                      | Autenticação |
| ------ | ------------- | ------------------------------ | ------------ |
| POST   | `/users`      | Criar novo usuário             | Não          |
| GET    | `/users/:id`  | Buscar usuário por ID          | Sim          |
| PUT    | `/users/me`   | Atualizar dados do próprio usuário | Sim       |
| DELETE | `/users/me`   | Deletar a própria conta        | Sim          |

### Tweets

| Método | Rota                | Descrição                      | Autenticação |
| ------ | ------------------- | ------------------------------ | ------------ |
| POST   | `/tweets`           | Criar um novo tweet            | Sim          |
| POST   | `/tweets/:id/reply` | Responder a um tweet           | Sim          |
| GET    | `/tweets/:id`       | Buscar tweet por ID com respostas | Sim       |
| DELETE | `/tweets/:id`       | Deletar um tweet próprio       | Sim          |

### Likes

| Método | Rota                | Descrição              | Autenticação |
| ------ | ------------------- | ---------------------- | ------------ |
| POST   | `/tweets/:id/like`  | Curtir um tweet        | Sim          |
| DELETE | `/tweets/:id/like`  | Descurtir um tweet     | Sim          |

### Follows

| Método | Rota                  | Descrição                | Autenticação |
| ------ | --------------------- | ------------------------ | ------------ |
| POST   | `/users/:id/follow`   | Seguir um usuário        | Sim          |
| DELETE | `/users/:id/follow`   | Deixar de seguir usuário | Sim          |

### Feed

| Método | Rota    | Descrição                          | Autenticação |
| ------ | ------- | ---------------------------------- | ------------ |
| GET    | `/feed` | Obter feed com paginação           | Sim          |

---

## Exemplos de Requisição e Resposta

### Health Check

**Requisição:**

```bash
GET /health
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "A API está saudável."
}
```

---

### Criar Usuário

**Requisição:**

```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "password": "senha123",
  "photoUrl": "https://example.com/foto.jpg"
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Usuário criado com sucesso!",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@example.com",
    "photoUrl": "https://example.com/foto.jpg",
    "isActive": true,
    "createdAt": "2024-06-01T12:00:00Z",
    "updatedAt": "2024-06-01T12:00:00Z"
  }
}
```

**Regras de validação:**

| Campo       | Regra                                      |
| ----------- | ------------------------------------------ |
| `name`      | Obrigatório, string, mínimo 1 caractere    |
| `username`  | Obrigatório, string, mínimo 3 caracteres   |
| `email`     | Obrigatório, formato email válido          |
| `password`  | Obrigatório, string, mínimo 6 caracteres   |
| `photoUrl`  | Opcional, formato URL válido               |

---

### Login

**Requisição (com email):**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Requisição (com username):**

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "joaosilva",
  "password": "senha123"
}
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Login realizado com sucesso!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "João Silva",
      "username": "joaosilva",
      "email": "joao@example.com"
    }
  }
}
```

---

### Buscar Usuário por ID (protegida)

**Requisição:**

```bash
GET /users/123e4567-e89b-12d3-a456-426614174000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Usuário encontrado com sucesso!",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@example.com",
    "photoUrl": "https://example.com/foto.jpg",
    "isActive": true,
    "createdAt": "2024-06-01T12:00:00Z",
    "updatedAt": "2024-06-01T12:00:00Z",
    "tweets": [],
    "followers": []
  }
}
```

---

### Atualizar Usuário (protegida)

**Requisição:**

```bash
PUT /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "João Silva Santos",
  "photoUrl": "https://example.com/nova-foto.jpg"
}
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso!",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva Santos",
    "username": "joaosilva",
    "email": "joao@example.com",
    "photoUrl": "https://example.com/nova-foto.jpg",
    "isActive": true,
    "createdAt": "2024-06-01T12:00:00Z",
    "updatedAt": "2024-06-01T13:00:00Z"
  }
}
```

Todos os campos são opcionais na atualização. Apenas os campos enviados serão atualizados.

---

### Deletar Usuário (protegida)

**Requisição:**

```bash
DELETE /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Usuário deletado com sucesso!",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "João Silva Santos",
    "username": "joaosilva",
    "email": "joao@example.com"
  }
}
```

---

### Criar Tweet (protegida)

**Requisição:**

```bash
POST /tweets
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "content": "Olá, este é meu primeiro tweet no GrowTwitter!"
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Tweet criado com sucesso!",
  "data": {
    "id": "abc12345-e89b-12d3-a456-426614174000",
    "content": "Olá, este é meu primeiro tweet no GrowTwitter!",
    "type": "POST",
    "authorId": "123e4567-e89b-12d3-a456-426614174000",
    "parentId": null,
    "createdAt": "2024-06-01T12:00:00Z",
    "updatedAt": "2024-06-01T12:00:00Z"
  }
}
```

**Regras de validação:**

| Campo     | Regra                                  |
| --------- | -------------------------------------- |
| `content` | Obrigatório, string, 1 a 280 caracteres|

---

### Responder Tweet (protegida)

**Requisição:**

```bash
POST /tweets/abc12345-e89b-12d3-a456-426614174000/reply
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "content": "Concordo totalmente com esse tweet!"
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Resposta ao tweet criada com sucesso!",
  "data": {
    "id": "def67890-e89b-12d3-a456-426614174000",
    "content": "Concordo totalmente com esse tweet!",
    "type": "REPLY",
    "authorId": "123e4567-e89b-12d3-a456-426614174000",
    "parentId": "abc12345-e89b-12d3-a456-426614174000",
    "createdAt": "2024-06-01T12:05:00Z",
    "updatedAt": "2024-06-01T12:05:00Z"
  }
}
```

---

### Buscar Tweet por ID (protegida)

**Requisição:**

```bash
GET /tweets/abc12345-e89b-12d3-a456-426614174000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Tweet recuperado com sucesso!",
  "data": {
    "tweet": {
      "id": "abc12345-e89b-12d3-a456-426614174000",
      "content": "Olá, este é meu primeiro tweet no GrowTwitter!",
      "type": "POST",
      "author": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "João Silva",
        "username": "joaosilva"
      },
      "createdAt": "2024-06-01T12:00:00Z"
    },
    "replies": [
      {
        "id": "def67890-e89b-12d3-a456-426614174000",
        "content": "Concordo totalmente com esse tweet!",
        "type": "REPLY",
        "author": {
          "id": "456e7890-e89b-12d3-a456-426614174000",
          "name": "Maria Souza",
          "username": "mariasouza"
        },
        "createdAt": "2024-06-01T12:05:00Z"
      }
    ]
  }
}
```

---

### Deletar Tweet (protegida)

**Requisição:**

```bash
DELETE /tweets/abc12345-e89b-12d3-a456-426614174000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Tweet deletado com sucesso!",
  "data": {
    "id": "abc12345-e89b-12d3-a456-426614174000",
    "content": "Olá, este é meu primeiro tweet no GrowTwitter!",
    "type": "POST"
  }
}
```

---

### Curtir Tweet (protegida)

**Requisição:**

```bash
POST /tweets/abc12345-e89b-12d3-a456-426614174000/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Tweet curtido com sucesso!",
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "tweetId": "abc12345-e89b-12d3-a456-426614174000",
    "createdAt": "2024-06-01T12:10:00Z",
    "updatedAt": "2024-06-01T12:10:00Z"
  }
}
```

---

### Descurtir Tweet (protegida)

**Requisição:**

```bash
DELETE /tweets/abc12345-e89b-12d3-a456-426614174000/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Tweet descurtido com sucesso!",
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "tweetId": "abc12345-e89b-12d3-a456-426614174000"
  }
}
```

---

### Seguir Usuário (protegida)

**Requisição:**

```bash
POST /users/456e7890-e89b-12d3-a456-426614174000/follow
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Usuário seguido com sucesso!",
  "data": {
    "followerId": "123e4567-e89b-12d3-a456-426614174000",
    "followingId": "456e7890-e89b-12d3-a456-426614174000",
    "createdAt": "2024-06-01T12:15:00Z",
    "updatedAt": "2024-06-01T12:15:00Z"
  }
}
```

---

### Deixar de Seguir Usuário (protegida)

**Requisição:**

```bash
DELETE /users/456e7890-e89b-12d3-a456-426614174000/follow
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Usuário deixado de seguir com sucesso!",
  "data": {
    "followerId": "123e4567-e89b-12d3-a456-426614174000",
    "followingId": "456e7890-e89b-12d3-a456-426614174000"
  }
}
```

---

### Obter Feed (protegida)

**Requisição:**

```bash
GET /feed?page=1&pageSize=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Feed do usuário recuperado com sucesso!",
  "data": {
    "tweets": [
      {
        "id": "abc12345-e89b-12d3-a456-426614174000",
        "content": "Olá, este é meu primeiro tweet no GrowTwitter!",
        "type": "POST",
        "author": {
          "id": "456e7890-e89b-12d3-a456-426614174000",
          "name": "Maria Souza",
          "username": "mariasouza"
        },
        "createdAt": "2024-06-01T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

**Parâmetros de query:**

| Parâmetro  | Tipo   | Obrigatório | Descrição                          |
| ---------- | ------ | ----------- | ---------------------------------- |
| `page`     | Number | Não         | Número da página (padrão: 1)       |
| `pageSize` | Number | Não         | Itens por página (padrão: definido pelo serviço) |

---

## Regras de Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação stateless.

### Como Funciona

1. **Login**: O usuário envia email (ou username) e senha
2. **Token**: Se as credenciais forem válidas, um token JWT é retornado
3. **Requisições**: O token deve ser enviado no header das requisições protegidas

### Formato do Token

O token JWT possui três partes separadas por ponto:

```
xxxxx.yyyyy.zzzzz
Header . Payload . Assinatura
```

**Estrutura do Payload:**

```json
{
  "userId": "uuid-do-usuario",
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Como Enviar o Token

Inclua o token no header `Authorization` com o prefixo `Bearer`:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tempo de Expiração

O token expira conforme configurado em `JWT_EXPIRES_IN` (padrão: `1h`).

Após expirar, o usuário deve fazer login novamente.

### Validação do Token

| Situação       | Resposta                           |
| -------------- | ---------------------------------- |
| Token ausente  | 401 - "Token não fornecido"        |
| Token inválido | 401 - "Token inválido ou expirado" |
| Token expirado | 401 - "Token inválido ou expirado" |
| Token válido   | Requisição processada normalmente  |

### Rotas Protegidas

Todas as rotas exceto `/health`, `/users` (POST) e `/auth/login` requerem autenticação.

### Boas Práticas

- **Nunca** exponha o `JWT_SECRET` em código cliente
- **Guarde** tokens em local seguro (não usar localStorage para produção)
- **Use HTTPS** em produção para proteger o token
- **Configure** tempo de expiração adequado (`1h` recomendado)

---

## Estrutura do Projeto

```
├── src/
│   ├── app.ts                # Configuração do Express
│   ├── server.ts             # Ponto de entrada da aplicação
│   ├── config/               # Configurações
│   ├── container/            # Injeção de dependência
│   ├── controllers/          # Controladores da API
│   │   ├── feed.controller.ts
│   │   ├── follow.controller.ts
│   │   ├── like.controller.ts
│   │   ├── tweet.controller.ts
│   │   └── user.controller.ts
│   ├── database/             # Repositories do banco de dados
│   ├── dtos/                 # Data Transfer Objects
│   ├── envs/                 # Configurações de ambiente
│   ├── middlewares/          # Middlewares (autenticação, validação)
│   ├── models/               # Modelos de dados
│   ├── routes/               # Definições de rotas
│   │   ├── auth.routes.ts
│   │   ├── feed.routes.ts
│   │   ├── follows.routes.ts
│   │   ├── health.routes.ts
│   │   ├── index.ts
│   │   ├── likes.routes.ts
│   │   ├── tweets.routes.ts
│   │   └── users.routes.ts
│   ├── services/             # Lógica de negócio
│   ├── shared/               # Arquivos compartilhados
│   ├── swagger.json          # Documentação Swagger gerada
│   ├── swagger.ts            # Configuração do Swagger
│   └── utils/                # Utilitários
├── prisma/
│   ├── schema.prisma         # Esquema do banco de dados
│   └── migrations/           # Migrações do Prisma
├── tests/                    # Testes automatizados
├── .env                      # Variáveis de ambiente
├── .env.example              # Template de variáveis
├── docker-compose.yml        # Serviços Docker
├── Dockerfile                # Configuração do container
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração do TypeScript
└── readme.md                 # Este arquivo
```

---

## Documentação da API (Swagger)

Após iniciar a API, acesse a documentação interativa:

```
http://localhost:3030/docs
```

A documentação Swagger inclui todos os endpoints, schemas de requisição/resposta e permite testar as rotas diretamente pelo navegador.

---

## Funcionalidades Implementadas

### Core

- [x] Cadastro de usuários com validação
- [x] Autenticação com JWT (email ou username)
- [x] Criptografia de senhas com bcrypt
- [x] CRUD completo de tweets
- [x] Respostas a tweets (replies)
- [x] Sistema de likes/curtidas
- [x] Sistema de follows/seguidores
- [x] Feed personalizado com paginação
- [x] Proteção de rotas com middleware
- [x] Isolamento de dados por usuário
- [x] Atualização e deleção de conta própria

### Extras

- [x] Validação de dados com express-validator
- [x] Documentação Swagger
- [x] Docker para desenvolvimento
- [x] Dependency Injection (Container)
- [x] Repository Pattern
- [x] Padronização de respostas HTTP
- [x] Mensagens de erro em português
- [x] TSDocs em controllers, routes e services
- [ ] Testes automatizados
- [ ] Refresh token
- [ ] Deploy da API
- [ ] Logs estruturados
- [ ] Rate limiting
- [ ] Upload de imagens

### Decisões de Projeto Adotadas

- Documentação de rotas, controllers e services com TSDocs
- Documentação da API com Swagger (swagger-autogen)
- Utilização de Docker para containerização
- Mensagens de erro em português
- Utilização do Repository Pattern
- Padronização de respostas HTTP através do `HTTPResponse`
- Injeção de dependência via container
- Soft delete para usuários (campo `deletedAt`)
- Cascade delete para tweets, likes e follows
- Chave composta para Likes e Follows (evita duplicatas)

---

## Requisitos

### Funcionais

| ID   | Requisito                                    |
| ---- | -------------------------------------------- |
| RF01 | Cadastro de usuários com validação           |
| RF02 | Login com email ou username                  |
| RF03 | Buscar usuário por ID                        |
| RF04 | Atualizar dados do próprio usuário           |
| RF05 | Deletar a própria conta                      |
| RF06 | Criar tweet (máximo 280 caracteres)          |
| RF07 | Responder a um tweet existente               |
| RF08 | Buscar tweet por ID com suas respostas       |
| RF09 | Deletar tweet próprio                        |
| RF10 | Curtir um tweet                              |
| RF11 | Descurtir um tweet                           |
| RF12 | Seguir outro usuário                         |
| RF13 | Deixar de seguir outro usuário               |
| RF14 | Obter feed com paginação                     |

### Não Funcionais

| ID    | Requisito                           |
| ----- | ----------------------------------- |
| RNF01 | Autenticação JWT                    |
| RNF02 | Rotas protegidas                    |
| RNF03 | Senhas criptografadas com bcrypt    |
| RNF04 | Email único                         |
| RNF05 | Username único                      |
| RNF06 | Validação de campos                 |
| RNF07 | Tratamento de erros                 |
| RNF08 | Documentação Swagger                |
| RNF09 | Uso correto de códigos HTTP         |
| RNF10 | Containerização com Docker          |
| RNF11 | Injeção de dependência              |

---

## Códigos de Erro

| Código | Descrição                                |
| ------ | ---------------------------------------- |
| 400    | Requisição inválida (erros de validação) |
| 401    | Não autorizado (token ausente/inválido)  |
| 401    | Credenciais inválidas                    |
| 404    | Recurso não encontrado                   |
| 409    | Conflito (email/username já existe)      |
| 500    | Erro interno do servidor                 |

---

## Contribuição

Contribuições são bem-vindas! Abra issues e pull requests.

## Licença

ISC
