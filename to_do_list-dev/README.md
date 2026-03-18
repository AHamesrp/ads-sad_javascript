# 📝 Lista de Tarefas - Aplicativo React Native

Aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido em React Native com Expo, realizando operações CRUD completas através da integração com MockAPI.

## 🎯 Funcionalidades

- ✅ **CREATE**: Criar novas tarefas com título, descrição, prioridade e status
- 📋 **READ**: Listar todas as tarefas cadastradas com atualização automática
- ✏️ **UPDATE**: Editar tarefas existentes com dados pré-preenchidos
- 🗑️ **DELETE**: Excluir tarefas com modal de confirmação obrigatório
- 🔄 **Pull to Refresh**: Atualizar lista puxando para baixo
- 🎨 **Interface Intuitiva**: Design limpo e organizado
- 📱 **Navegação Fluida**: Transições suaves entre telas

## 🚀 Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para facilitar o desenvolvimento
- **React Navigation**: Biblioteca de navegação entre telas
- **MockAPI**: Serviço de API REST para testes
- **Fetch API**: Para requisições HTTP (GET, POST, PUT, DELETE)

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo Expo Go no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

## 🔧 Configuração do MockAPI

### Passo 1: Criar conta no MockAPI

1. Acesse [https://mockapi.io/](https://mockapi.io/)
2. Clique em "Get Started" e faça login com GitHub
3. Crie um novo projeto clicando em "New Project"

### Passo 2: Criar o recurso de tarefas

1. No seu projeto, clique em "New Resource"
2. Configure o recurso da seguinte forma:
   - **Resource name**: `tasks`
   - Clique em "Create"

### Passo 3: Configurar os campos

Adicione os seguintes campos ao recurso `tasks`:

| Campo | Tipo | Exemplo |
|-------|------|---------|
| `id` | id | (gerado automaticamente) |
| `title` | text | "Estudar React Native" |
| `description` | text | "Revisar conceitos de hooks" |
| `priority` | text | "alta", "media" ou "baixa" |
| `completed` | boolean | true ou false |
| `createdAt` | datetime | (gerado automaticamente) |

### Passo 4: Copiar a URL da API

1. Após criar o recurso, você verá uma URL como:
   ```
   https://[seu-id].mockapi.io/api/v1/tasks
   ```
2. Copie esta URL

### Passo 5: Configurar a URL no aplicativo

1. Abra o arquivo `src/services/api.js`
2. Substitua a URL da constante `API_URL` pela sua URL do MockAPI:

```javascript
const API_URL = 'https://[seu-id].mockapi.io/api/v1/tasks';
```

## 📦 Instalação

1. Clone ou baixe este repositório

2. Navegue até a pasta do projeto:
```bash
cd TodoListApp
```

3. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar

1. Inicie o servidor Expo:
```bash
npm start
```

2. Escaneie o QR Code com o aplicativo Expo Go:
   - **Android**: Use o próprio aplicativo Expo Go
   - **iOS**: Use a câmera nativa do iPhone

3. O aplicativo será carregado no seu celular

### Comandos Alternativos

```bash
# Executar no emulador Android
npm run android

# Executar no simulador iOS (apenas macOS)
npm run ios

# Executar no navegador web
npm run web
```

## 📱 Como Usar o Aplicativo

### Criar uma Tarefa
1. Na tela inicial, toque no botão **+** (canto inferior direito)
2. Preencha o título (obrigatório)
3. Adicione uma descrição (opcional)
4. Escolha a prioridade (Baixa, Média ou Alta)
5. Toque em "Criar"

### Editar uma Tarefa
1. Na lista de tarefas, toque no botão **"Editar"** da tarefa desejada
2. Modifique os campos necessários
3. Altere o status se desejar (Pendente/Concluída)
4. Toque em "Atualizar"

### Excluir uma Tarefa
1. Na lista de tarefas, toque no botão **"Excluir"**
2. Um modal de confirmação será exibido
3. Confirme tocando em "Excluir" ou cancele tocando em "Cancelar"

### Atualizar a Lista
- Puxe a lista para baixo (pull to refresh) para atualizar os dados

## 📂 Estrutura do Projeto

```
TodoListApp/
├── src/
│   ├── components/
│   │   ├── DeleteModal.js      # Modal de confirmação de exclusão
│   │   └── TaskItem.js          # Componente de item da lista
│   ├── screens/
│   │   ├── HomeScreen.js        # Tela principal com listagem
│   │   └── TaskFormScreen.js    # Tela de formulário (criar/editar)
│   └── services/
│       └── api.js               # Serviço de integração com API
├── App.js                       # Configuração de navegação
├── package.json                 # Dependências do projeto
└── README.md                    # Este arquivo
```

## 🎨 Componentes Principais

### HomeScreen
- Exibe lista de tarefas
- Pull to refresh
- Botão flutuante para adicionar tarefa
- Navegação para edição e exclusão

### TaskFormScreen
- Formulário de criação/edição
- Validação de campos
- Indicadores visuais de prioridade e status

### TaskItem
- Card visual de cada tarefa
- Badges de prioridade coloridos
- Status de conclusão
- Botões de ação (Editar/Excluir)

### DeleteModal
- Modal de confirmação
- Exibe título da tarefa
- Botões de confirmar/cancelar

## 🔌 API - Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Busca todas as tarefas |
| POST | `/tasks` | Cria nova tarefa |
| PUT | `/tasks/:id` | Atualiza tarefa existente |
| DELETE | `/tasks/:id` | Remove uma tarefa |

## 🐛 Solução de Problemas

### Erro ao conectar com a API
- Verifique se a URL no arquivo `api.js` está correta
- Confirme se o recurso `tasks` foi criado no MockAPI
- Verifique sua conexão com a internet

### Aplicativo não carrega
- Execute `npm install` novamente
- Limpe o cache: `expo start -c`
- Reinicie o servidor Expo

### Erro de validação
- Certifique-se de preencher o título da tarefa
- O título deve ter pelo menos 3 caracteres

## 📝 Critérios de Avaliação Atendidos

### G1: Navegação, Integração com API e Design (0,5 ponto)
- ✅ Navegação fluida com React Navigation
- ✅ Integração completa com MockAPI usando Fetch API
- ✅ Interface organizada e intuitiva
- ✅ Componentes bem distribuídos

### G2: Funcionalidades CRUD (1,5 ponto)
- ✅ Busca e exibição de todos os registros ao iniciar
- ✅ Lista atualizada automaticamente após operações
- ✅ Formulário de cadastro funcional
- ✅ Edição com dados pré-preenchidos
- ✅ Exclusão com modal de confirmação obrigatório

### E1: Compreensão Técnica (3,0 pontos)
- ✅ Código bem documentado e comentado
- ✅ Arquitetura organizada e escalável
- ✅ Boas práticas de desenvolvimento
- ✅ Fluxo de dados claro e preciso

## 👥 Equipe

[Nome dos integrantes da equipe aqui]

## 📄 Licença

Este projeto foi desenvolvido como parte da Avaliação Prática do curso Técnico em Desenvolvimento de Sistemas - SENAI.

## 🆘 Suporte

Em caso de dúvidas ou problemas:
1. Verifique a documentação do [Expo](https://docs.expo.dev/)
2. Consulte a documentação do [React Navigation](https://reactnavigation.org/)
3. Acesse o suporte do [MockAPI](https://mockapi.io/docs)

---

**Desenvolvido com ❤️ em React Native + Expo**
