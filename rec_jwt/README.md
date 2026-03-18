# API de Autenticação com JWT

Sistema de autenticação desenvolvido com Node.js, Express e JSON Web Tokens.

## Tecnologias Utilizadas

- Node.js
- Express.js
- JSON Web Token (JWT)
- dotenv

## Instalação

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório ou extraia os arquivos

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Edite o arquivo `.env` e configure as variáveis:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:
```
PORT=3000
JWT_SECRET=sua_chave_secreta_forte_aqui
```

## Execução

### Modo desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Modo produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

### 1. Rota inicial (pública)
**GET** `/`

Retorna mensagem de boas-vindas.

**Resposta:**
```json
{
  "mensagem": "Bem-vindo à API!"
}
```

### 2. Cadastro de usuário
**POST** `/cadastro`

Registra um novo usuário no sistema.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "mensagem": "Usuário cadastrado com sucesso"
}
```

### 3. Login
**POST** `/login`

Autentica o usuário e retorna um token JWT válido por 1 hora.

**Body:**
```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Perfil (rota protegida)
**GET** `/perfil`

Acessa informações do perfil. Requer autenticação.

**Headers:**
```
Authorization: SEU_TOKEN_AQUI
```

**Resposta de sucesso:**
```json
{
  "mensagem": "Você está autenticado!"
}
```

## Testando a API

### Usando curl:

1. Cadastrar usuário:
```bash
curl -X POST http://localhost:3000/cadastro \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@example.com","senha":"senha123"}'
```

2. Fazer login:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@example.com","senha":"senha123"}'
```

3. Acessar rota protegida:
```bash
curl -X GET http://localhost:3000/perfil \
  -H "Authorization: SEU_TOKEN_AQUI"
```

### Usando Postman ou Insomnia:

1. Configure as requisições conforme os endpoints acima
2. Para rotas protegidas, adicione o header `Authorization` com o token recebido no login

## Estrutura do Projeto

```
.
├── server.js          # Arquivo principal do servidor
├── routes.js          # Definição de todas as rotas
├── package.json       # Dependências e scripts
├── .env.example       # Exemplo de variáveis de ambiente
├── .env              # Variáveis de ambiente (não commitar)
└── README.md         # Documentação
```

## Segurança

- Tokens JWT expiram em 1 hora
- Senhas são armazenadas em texto simples (apenas para fins educacionais)
- Em produção, use hash de senhas (bcrypt) e HTTPS

## Observações

- Os dados são armazenados em memória (array)
- Ao reiniciar o servidor, todos os dados são perdidos
- Para persistência, implemente um banco de dados real