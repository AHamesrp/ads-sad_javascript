# EcoRide Frontend

Interface web React para a plataforma de caronas compartilhadas EcoRide.

## Tecnologias

- **React 19** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações
- **Date-fns** - Manipulação de datas

## Pré-requisitos

- Node.js 18+
- Backend EcoRide rodando na porta 3000

## Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Loading.jsx
│   ├── RideCard.jsx
│   └── SearchForm.jsx
├── context/          # Context API
│   └── AuthContext.jsx
├── hooks/            # Custom hooks
│   └── useFormat.js
├── pages/            # Páginas da aplicação
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── RideDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── PublishRide.jsx
│   ├── Dashboard.jsx
│   └── Profile.jsx
├── services/         # Serviços de API
│   └── api.js
├── App.jsx           # Componente principal
├── main.jsx          # Entry point
└── index.css         # Estilos globais
```

## Páginas

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/` | Página inicial | Não |
| `/search` | Buscar caronas | Não |
| `/ride/:id` | Detalhes da carona | Não |
| `/login` | Login | Não |
| `/register` | Cadastro | Não |
| `/publish` | Publicar carona | Sim |
| `/dashboard` | Minhas viagens | Sim |
| `/profile` | Meu perfil | Sim |

## Funcionalidades

### Públicas
- Visualizar página inicial com estatísticas
- Buscar caronas com filtros
- Ver detalhes de uma carona
- Criar conta / fazer login

### Autenticadas
- Publicar nova carona (formulário multi-step)
- Reservar lugares em caronas
- Gerenciar minhas viagens (motorista/passageiro)
- Editar perfil e preferências
- Cancelar reservas

## Configuração de Ambiente

O frontend se conecta ao backend através de proxy configurado no Vite:

```js
// vite.config.js
server: {
  port: 8080,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```

Para produção, configure a variável `VITE_API_URL` apontando para o backend.

## Design System

### Cores Principais
- **Primary (Azul)**: #0073e6 - #002a4d
- **Secondary (Verde)**: #00b38f - #003f32
- **Accent (Amarelo)**: #ffc61a

### Tipografia
- **Display**: Outfit
- **Body**: DM Sans

### Componentes
- Botões: `btn-primary`, `btn-secondary`
- Inputs: `input-field`
- Cards com hover: `card-hover`
- Loading states: `LoadingSpinner`, `LoadingPage`, `LoadingRideCard`

## Responsividade

O design é totalmente responsivo:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (porta 8080)
npm run build    # Build de produção
npm run preview  # Preview do build
```

## Integração com Backend

O frontend consome os seguintes endpoints:

### Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil
- `PUT /api/auth/profile` - Atualizar perfil

### Rides
- `GET /api/rides/search` - Buscar
- `GET /api/rides/popular` - Populares
- `GET /api/rides/:id` - Detalhes
- `POST /api/rides` - Criar
- `POST /api/rides/:id/book` - Reservar
- `DELETE /api/rides/:id/book` - Cancelar
- `GET /api/rides/user/rides` - Minhas viagens

### Stats
- `GET /api/stats/global` - Estatísticas globais
- `GET /api/stats/user` - Estatísticas do usuário

---

**EcoRide** - Viaje junto, economize mais, preserve o planeta!
