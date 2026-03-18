# 📚 Study Tracker

Aplicativo de gerenciamento de estudos desenvolvido com React Native (Expo) e Node.js.

## 📋 Funcionalidades

- ✅ **Criar** novos registros de estudo
- ✅ **Visualizar** todos os estudos cadastrados
- ✅ **Editar** estudos existentes
- ✅ **Excluir** estudos
- ✅ **Status de aprendizado** com 3 opções:
  - 🔴 Ainda não aprendi
  - 🟡 Aprendi, mas não domino
  - 🟢 Conteúdo dominado

## 🏗️ Estrutura do Projeto

```
study-tracker/
├── backend/                 # API REST Node.js
│   ├── src/
│   │   ├── server.js       # Servidor Express
│   │   ├── routes.js       # Rotas da API
│   │   └── database.js     # Configuração SQLite
│   └── package.json
│
└── frontend/               # App React Native (Expo)
    ├── src/
    │   ├── screens/
    │   │   ├── HomeScreen.js       # Tela principal
    │   │   └── StudyFormScreen.js  # Formulário
    │   ├── components/
    │   │   └── StudyCard.js        # Card de estudo
    │   └── services/
    │       └── api.js              # Serviço de API
    ├── App.js
    └── package.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### 1. Backend (API)

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

O servidor rodará em `http://localhost:3001`

### 2. Frontend (App)

```bash
# Em outro terminal, entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o Expo
npx expo start
```

Pressione `w` para abrir no navegador ou escaneie o QR Code com o app Expo Go.

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/studies` | Listar todos os estudos |
| GET | `/api/studies/:id` | Buscar estudo por ID |
| POST | `/api/studies` | Criar novo estudo |
| PUT | `/api/studies/:id` | Atualizar estudo |
| DELETE | `/api/studies/:id` | Excluir estudo |

### Exemplo de Requisição POST

```json
{
  "title": "Introdução ao React Native",
  "content": "Estudar componentes, estado e navegação",
  "status": "not_learned"
}
```

### Valores de Status

- `not_learned` - Ainda não aprendi
- `learned_not_mastered` - Aprendi, mas não domino
- `mastered` - Conteúdo dominado

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- CORS

### Frontend
- React Native
- Expo
- React Navigation
- @react-native-picker/picker

## 📱 Screenshots

O app possui:
- Tela inicial com listagem de estudos
- Cards coloridos por status
- Formulário para criar/editar estudos
- Picker para seleção de status
- FAB (Floating Action Button) para adicionar

## ⚠️ Observações

- Para testar no celular físico, altere a URL da API em `frontend/src/services/api.js` para o IP da sua máquina
- O banco de dados SQLite é criado automaticamente em `backend/database.db`

## 👤 Autor

Desenvolvido como exercício prático de React Native com Expo.
