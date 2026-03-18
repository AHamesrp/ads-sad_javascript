# EcoRide Backend API

API RESTful para plataforma de carona compartilhada sustentável desenvolvida em Node.js com PostgreSQL (Supabase).

## 📋 Sobre o Projeto

O EcoRide é uma API backend que oferece funcionalidades para um sistema de carona compartilhada, focando em:
- Sustentabilidade ambiental
- Economia de custos
- Facilidade de uso
- Segurança nas viagens

**Desenvolvido para:** Situação de Aprendizagem - Mobilidade do Futuro  
**Curso:** Técnico em Desenvolvimento de Sistemas  
**Disciplina:** Modelagem de Sistemas (MDSI)

## 🚀 Tecnologias Utilizadas

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (Supabase)
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** Express Validator
- **Segurança:** Helmet, CORS, Rate Limiting
- **Documentação:** Este README

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18 ou superior
- Conta no Supabase
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd SA-Mobilidade-3C-backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3000
NODE_ENV=development

# Supabase Database
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend
FRONTEND_URL=http://localhost:8080
```

### 4. Configure o banco de dados

Execute os comandos SQL no Dashboard do Supabase (SQL Editor):

```sql
-- Criar tabela users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  avatar TEXT,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{"smoking_allowed": false, "pets_allowed": false, "music_allowed": true}',
  co2_saved DECIMAL(10,3) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela rides
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES users(id) NOT NULL,
  origin_city VARCHAR(100) NOT NULL,
  origin_state VARCHAR(10) NOT NULL,
  origin_address TEXT,
  destination_city VARCHAR(100) NOT NULL,
  destination_state VARCHAR(10) NOT NULL,
  destination_address TEXT,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  available_seats INTEGER NOT NULL CHECK (available_seats >= 0 AND available_seats <= 4),
  original_seats INTEGER NOT NULL,
  price_per_seat DECIMAL(10, 2) NOT NULL CHECK (price_per_seat >= 1),
  description TEXT,
  vehicle_model VARCHAR(100),
  vehicle_color VARCHAR(50),
  vehicle_plate VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'full', 'completed', 'cancelled')),
  distance INTEGER,
  co2_emission DECIMAL(10, 3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela ride_passengers
CREATE TABLE ride_passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  seats_booked INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ride_id, user_id)
);

-- Criar tabela notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_ride_id UUID REFERENCES rides(id) ON DELETE SET NULL,
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS para desenvolvimento
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE rides DISABLE ROW LEVEL SECURITY;
ALTER TABLE ride_passengers DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
```

### 5. Popule o banco com dados de exemplo
```bash
npm run seed
```

### 6. Execute a aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Autenticação
A API utiliza JWT (JSON Web Tokens). Para rotas protegidas, inclua o token no header:
```
Authorization: Bearer <seu-token-jwt>
```

### Endpoints Disponíveis

#### 🔐 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/register` | Registrar novo usuário | Não |
| POST | `/login` | Fazer login | Não |
| GET | `/profile` | Obter perfil do usuário | Sim |
| PUT | `/profile` | Atualizar perfil | Sim |

#### 🚗 Caronas (`/api/rides`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/search` | Buscar caronas | Não |
| GET | `/popular` | Caronas populares | Não |
| GET | `/:id` | Obter carona específica | Não |
| POST | `/` | Criar nova carona | Sim |
| POST | `/:id/book` | Reservar carona | Sim |
| DELETE | `/:id/book` | Cancelar reserva | Sim |
| GET | `/user/rides` | Caronas do usuário | Sim |

#### 📊 Estatísticas (`/api/stats`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/global` | Estatísticas globais | Não |
| GET | `/user` | Estatísticas do usuário | Sim |

#### 🔔 Notificações (`/api/notifications`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/` | Listar notificações | Sim |
| GET | `/unread-count` | Contador não lidas | Sim |
| PUT | `/:id/read` | Marcar como lida | Sim |
| PUT | `/mark-all-read` | Marcar todas como lidas | Sim |

### Exemplos de Requisições

#### Registrar usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 99999-9999",
    "password": "123456"
  }'
```

#### Fazer login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

#### Buscar caronas
```bash
curl "http://localhost:3000/api/rides/search?origin=São Paulo&destination=Rio de Janeiro&date=2025-09-25"
```

#### Criar carona
```bash
curl -X POST http://localhost:3000/api/rides \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "origin": {"city": "São Paulo", "state": "SP"},
    "destination": {"city": "Rio de Janeiro", "state": "RJ"},
    "departureDate": "2025-09-25",
    "departureTime": "14:30",
    "availableSeats": 3,
    "pricePerSeat": 65,
    "description": "Viagem tranquila, ar condicionado",
    "distance": 430
  }'
```

#### Obter estatísticas globais
```bash
curl http://localhost:3000/api/stats/global
```

### Respostas da API

#### Formato de Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    // dados da resposta
  }
}
```

#### Formato de Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": [
    // detalhes dos erros (opcional)
  ]
}
```

## 🗂️ Estrutura do Projeto

```
SA-Mobilidade-3C-backend/
├── config/
│   └── database.js          # Configuração do Supabase
├── controllers/
│   ├── authController.js    # Controle de autenticação
│   ├── rideController.js    # Controle de caronas
│   └── statsController.js   # Controle de estatísticas
├── middleware/
│   ├── auth.js              # Middleware de autenticação
│   ├── validation.js        # Middleware de validação
│   └── errorHandler.js      # Tratamento de erros
├── models/
│   ├── User.js              # Model de usuários
│   ├── Ride.js              # Model de caronas
│   └── Notification.js      # Model de notificações
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   ├── rides.js             # Rotas de caronas
│   └── stats.js             # Rotas de estatísticas
├── services/
│   └── authService.js       # Serviços de autenticação
├── utils/
│   ├── seedData.js          # Popular banco com dados
│   └── clearData.js         # Limpar dados do banco
├── uploads/                 # Arquivos enviados
├── app.js                   # Configuração da aplicação
├── server.js                # Servidor principal
├── package.json             # Dependências do projeto
├── .env.example             # Exemplo de variáveis de ambiente
└── README.md                # Documentação
```

## 🎮 Scripts Disponíveis

```bash
# Executar em desenvolvimento (com auto-reload)
npm run dev

# Executar em produção
npm start

# Popular banco com dados de exemplo
npm run seed

# Limpar dados do banco
npm run clear

# Executar testes (se configurados)
npm test
```

## 🔧 Funcionalidades Implementadas

### Autenticação e Usuários
- Registro de usuários com validação
- Login com JWT
- Perfil de usuário
- Sistema de avaliações (rating)

### Sistema de Caronas
- Criação de caronas
- Busca com filtros (origem, destino, data)
- Reserva de assentos
- Cancelamento de reservas
- Controle de status (ativa, lotada, concluída)

### Regras de Negócio
- Usuário não pode reservar própria carona
- Verificação de assentos disponíveis
- Cálculo de CO₂ economizado
- Controle de status automático

### Segurança
- Autenticação JWT
- Rate limiting (100 req/15min)
- Validação de dados de entrada
- Headers de segurança (Helmet)
- CORS configurado

### Performance
- Índices otimizados no banco
- Compression de respostas
- Consultas eficientes

## 📊 Dados de Exemplo

Após executar `npm run seed`, a API terá:

**Usuários:**
- maria@example.com (senha: 123456)
- joao@example.com (senha: 123456)
- ana@example.com (senha: 123456)

**Caronas:**
- São Paulo → Rio de Janeiro (hoje 14:30) - R$ 65
- Campinas → São Paulo (amanhã 07:00) - R$ 25
- Belo Horizonte → Brasília (em 5 dias) - R$ 85

## 🚀 Deploy

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
PORT=3000
SUPABASE_URL=sua-url-producao
SUPABASE_ANON_KEY=sua-chave-producao
JWT_SECRET=chave-secreta-forte-producao
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Comandos de Deploy
```bash
# Instalar dependências de produção
npm ci --production

# Executar
npm start
```

## 🔍 Testes

### Health Check
```bash
curl http://localhost:3000/health
```

### Testar Endpoints Principais
```bash
# Estatísticas
curl http://localhost:3000/api/stats/global

# Caronas populares
curl http://localhost:3000/api/rides/popular

# Buscar caronas
curl http://localhost:3000/api/rides/search
```

## 🤝 Contribuição

Este projeto foi desenvolvido para fins educacionais como parte do curso Técnico em Desenvolvimento de Sistemas.

---

**EcoRide Backend API** - Conectando pessoas, economizando recursos, preservando o meio ambiente. 🌱🚗
