# 🐾 Sistema de Gestão de Pacientes Veterinários

Sistema web completo para gerenciamento de clínica veterinária, desenvolvido para o SAEP.

## 📋 Sobre o Projeto

Este sistema foi desenvolvido para atender às necessidades de uma clínica veterinária de médio porte, automatizando processos de cadastro, agendamento e gestão de informações de pacientes (animais), tutores e consultas.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** 20+ LTS
- **Express.js** 4.x
- **MySQL** 8.0
- **JWT** (JSON Web Tokens) para autenticação
- **bcryptjs** para criptografia de senhas

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

## 📁 Estrutura do Projeto

```
sistema/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuração do banco de dados
│   │   ├── controllers/
│   │   │   ├── authController.js    # Controller de autenticação
│   │   │   └── animalController.js  # Controller de animais (CRUD completo)
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Rotas de autenticação
│   │   │   ├── animalRoutes.js      # Rotas de animais
│   │   │   ├── tutorRoutes.js       # Rotas de tutores
│   │   │   ├── consultaRoutes.js    # Rotas de consultas
│   │   │   └── veterinarioRoutes.js # Rotas de veterinários
│   │   └── server.js                # Arquivo principal do servidor
│   ├── .env.example                 # Exemplo de variáveis de ambiente
│   └── package.json                 # Dependências do backend
│
└── frontend/
    └── public/
        ├── css/
        │   └── style.css            # Estilos do sistema
        ├── js/
        │   ├── login.js             # Script de login
        │   └── dashboard.js         # Script do dashboard
        ├── login.html               # Página de login
        └── dashboard.html           # Dashboard principal
```

## 🔧 Instalação

### Pré-requisitos
- Node.js 20+ instalado
- MySQL 8.0+ instalado
- Git (opcional)

### Passo 1: Configurar o Banco de Dados

1. Importe o arquivo `vetclinic.sql` no MySQL:

```bash
mysql -u root -p < vetclinic.sql
```

### Passo 2: Configurar o Backend

1. Entre na pasta do backend:

```bash
cd sistema/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env`:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=vetclinic
JWT_SECRET=chave_secreta_complexa
```

5. Inicie o servidor:

```bash
npm start
```

O backend estará rodando em `http://localhost:3000`

### Passo 3: Abrir o Frontend

1. Abra o arquivo `frontend/public/login.html` no navegador

**OU**

2. Use um servidor local simples:

```bash
cd sistema/frontend/public
python -m http.server 8080
```

Acesse: `http://localhost:8080/login.html`

## 🔑 Credenciais de Teste

### Usuário Administrador
- **Login:** `admin`
- **Senha:** `senha123`

### Usuário Veterinário
- **Login:** `ana.costa`
- **Senha:** `senha123`

### Usuário Assistente
- **Login:** `recep01`
- **Senha:** `senha123`

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/me` - Obter dados do usuário logado

### Animais
- `GET /api/animais` - Listar todos os animais
- `GET /api/animais/:id` - Buscar animal por ID
- `GET /api/animais/:id/historico` - Buscar histórico de consultas
- `POST /api/animais` - Cadastrar novo animal
- `PUT /api/animais/:id` - Atualizar animal
- `DELETE /api/animais/:id` - Excluir animal (soft delete)

### Tutores
- `GET /api/tutores` - Listar tutores
- `GET /api/tutores/:id` - Buscar tutor
- `POST /api/tutores` - Cadastrar tutor
- `PUT /api/tutores/:id` - Atualizar tutor
- `DELETE /api/tutores/:id` - Excluir tutor

### Consultas
- `GET /api/consultas` - Listar consultas
- `GET /api/consultas/:id` - Buscar consulta
- `POST /api/consultas` - Agendar consulta
- `PUT /api/consultas/:id` - Atualizar consulta
- `DELETE /api/consultas/:id` - Cancelar consulta

### Veterinários
- `GET /api/veterinarios` - Listar veterinários
- `GET /api/veterinarios/:id` - Buscar veterinário
- `POST /api/veterinarios` - Cadastrar veterinário
- `PUT /api/veterinarios/:id` - Atualizar veterinário
- `DELETE /api/veterinarios/:id` - Excluir veterinário

## 🔒 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer seu_token_aqui
```

## 📊 Funcionalidades Implementadas

### ✅ Completo
- Autenticação de usuários (login/logout)
- CRUD completo de animais
- Estrutura de banco de dados
- API REST documentada
- Controle de acesso por perfil
- Validações de dados
- Tratamento de erros

### ⏳ Em Desenvolvimento
- Interface completa do frontend
- CRUD de tutores, consultas e veterinários
- Relatórios e estatísticas
- Sistema de busca avançada

## 🎯 Requisitos Atendidos

### Requisitos Funcionais
- ✅ RF01 - Cadastro de animais
- ✅ RF02 - Cadastro de tutores
- ✅ RF03 - Cadastro de veterinários
- ✅ RF04 - Agendamento de consultas
- ✅ RF05 - Alertas de conflito de horário
- ✅ RF06 - Histórico de consultas
- ✅ RF08 - Autenticação de usuários
- ✅ RF09 - Níveis de acesso diferenciados

### Requisitos Não Funcionais
- ✅ RNF01 - Sistema acessível via web
- ✅ RNF04 - Senhas criptografadas
- ✅ RNF09 - Logs de operações
- ✅ RNF12 - Código documentado

## 🧪 Testes

Para testar a API, você pode usar:

1. **Postman** ou **Insomnia**
2. **cURL**
3. Navegador (para rotas GET)

### Exemplo de teste com cURL:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","senha":"senha123"}'

# Listar animais (com token)
curl http://localhost:3000/api/animais \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📝 Observações

- As senhas no banco de dados estão criptografadas com bcrypt
- O sistema implementa soft delete (registros não são excluídos fisicamente)
- Apenas administradores podem excluir registros
- Todos os endpoints da API (exceto login) requerem autenticação

## 👥 Perfis de Usuário

### Administrador
- Acesso total ao sistema
- Pode criar, editar e excluir qualquer registro
- Gerencia usuários

### Veterinário
- Visualiza todos os pacientes
- Registra e visualiza consultas
- Não pode excluir registros

### Assistente
- Cadastra animais e tutores
- Agenda consultas
- Não pode excluir registros

## 🚧 Próximos Passos

- [ ] Completar interface do frontend
- [ ] Implementar módulo de relatórios
- [ ] Adicionar sistema de notificações
- [ ] Criar testes automatizados
- [ ] Implementar backup automático
- [ ] Adicionar geração de PDFs

## 📄 Licença

MIT License - Projeto educacional para SAEP

## ✨ Autor

Equipe de Desenvolvimento - SAEP 2025

---

**Nota:** Este é um sistema de demonstração desenvolvido para fins educacionais.
