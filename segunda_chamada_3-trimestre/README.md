# Aplicativo de Login e Navegação - React Native
## Descrição do Projeto
Este projeto implementa um sistema completo de login com navegação entre telas em React Native, atendendo a todos os requisitos do desafio.

## Requisitos Implementados

### 1. Estrutura e Componentes Essenciais
#### Duas Telas/Componentes:
- **LoginScreen.js** - Tela inicial com formulário de login
- **SuccessScreen.js** - Tela de sucesso após login válido

#### Componentes de UI Utilizados:
- `View` - Container para estruturação do layout
- `Text` - Exibição de textos e labels
- `TextInput` - Campos de entrada para usuário e senha
- `Button` - Botões de ação (Login e Logout)

### 2. Lógica de Login
#### Validação de Credenciais (Hardcoded):
```javascript
const CREDENCIAIS = {
  usuario: 'aluno',
  senha: '123'
};
```
#### Gerenciamento de Estado (useState):
```javascript
const [usuario, setUsuario] = useState('');
const [senha, setSenha] = useState('');
const [mensagemErro, setMensagemErro] = useState('');
```
#### Função de Login:
```javascript
const handleLogin = () => {
  if (!usuario.trim() || !senha.trim()) {
    setMensagemErro('Por favor, preencha todos os campos');
    return;
  }
  // Comparação
  if (usuario === CREDENCIAIS.usuario && senha === CREDENCIAIS.senha) {
    navigation.navigate('Success', { nomeUsuario: usuario });
    setUsuario('');
    setSenha('');
  } else {
    setMensagemErro('Credenciais inválidas. Tente novamente.');
  }
};
```

## Estrutura
```
LoginApp/
├── App.js                 # Configuração de navegação
├── LoginScreen.js         # Tela de login
├── SuccessScreen.js       # Tela de sucesso
├── package.json           # Dependências do projeto
└── README.md              # Documentação
```

## Funcionalidades
### LoginScreen (Tela 1)
1. **Campos de Entrada:**
   - Campo de usuário com autoCapitalize desabilitado
   - Campo de senha com secureTextEntry (oculta caracteres)
2. **Validações:**
   - Verifica se campos estão vazios
   - Compara credenciais com valores fixos
   - Exibe mensagem de erro específica
3. **Estados Gerenciados:**
   - `usuario` - Armazena o nome de usuário digitado
   - `senha` - Armazena a senha digitada
   - `mensagemErro` - Controla exibição de erros
4. **Navegação:**
   - Redireciona para SuccessScreen apenas se credenciais corretas
   - Passa o nome do usuário como parâmetro

### SuccessScreen (Tela 2)
1. **Recebe Parâmetros:**
   - Nome do usuário logado via route.params
2. **Exibição:**
   - Mensagem de boas-vindas personalizada
   - Ícone de sucesso
   - Lista de funcionalidades disponíveis
3. **Ação de Logout:**
   - Botão para retornar à tela de login


## Como Executar o Projeto
### Passo a Passo:
1. **Instalar dependências:**
```bash
npm install
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0
```

2. **Iniciar o projeto:**
```bash
npm start
```
3. **Executar no dispositivo:**
```bash
npm run android
npm run ios
npm run web
```

## Credenciais de Teste
**Usuário:** `aluno`  
**Senha:** `123`

## Características de UI/UX
### LoginScreen:
- Design limpo e moderno
- Campos com bordas arredondadas
- Feedback visual de erros em vermelho
- Dica das credenciais corretas
- Cores consistentes (#007AFF para elementos principais)

### SuccessScreen:
- Mensagem de sucesso destacada
- Ícone visual de confirmação (✓)
- Saudação personalizada com nome do usuário
- Card informativo com funcionalidades
- Botão de logout em vermelho (#ff3b30)

## Fluxo de Navegação
```
[LoginScreen]
     |
     | (credenciais corretas)
     ↓
[SuccessScreen]
     |
     | (logout)
     ↓
[LoginScreen]
```
