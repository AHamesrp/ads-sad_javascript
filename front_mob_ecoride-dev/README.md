# EcoRide Frontend

Aplicação web/mobile responsiva para a plataforma de carona compartilhada EcoRide, desenvolvida em React com design mobile-first inspirado no BlaBlaCar.

## Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento da aplicação
- **Zustand** - Gerenciamento de estado leve e simples
- **Axios** - Cliente HTTP para requisições à API
- **Lucide React** - Biblioteca de ícones moderna
- **date-fns** - Manipulação de datas

## Design

- **Mobile-First** - Desenvolvido prioritariamente para dispositivos móveis
- **Responsivo** - Adapta-se a qualquer tamanho de tela
- **Design System** - Paleta de cores em tons de azul consistente
- **UI/UX Moderno** - Inspirado nas melhores práticas do BlaBlaCar

## Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Configuração

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000/api
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/               # Páginas da aplicação
├── store/               # Estado global (Zustand)
├── services/            # Serviços de API
├── utils/               # Funções utilitárias
└── index.css            # Estilos globais
```

## Páginas

- `/` - Home
- `/buscar` - Busca de caronas
- `/carona/:id` - Detalhes da carona
- `/entrar` - Login
- `/cadastro` - Cadastro
- `/publicar` - Publicar carona
- `/minhas-caronas` - Minhas caronas
- `/perfil` - Perfil do usuário

---

**EcoRide** - Viaje junto, economize mais!
