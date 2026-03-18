# FLUXO DETALHADO E PSEUDOCÓDIGO
## Diagrama de Fluxo de Navegação
```
┌─────────────────────────────────────────────────────────────┐
│                      INÍCIO DO APP                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOGIN SCREEN                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  [Input] Usuário: _____________                       │  │
│  │  [Input] Senha:   _____________                       │  │
│  │                                                       │  │
│  │         [Botão: ENTRAR]                               │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ (Usuário clica em ENTRAR)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              VALIDAÇÃO DE CAMPOS                            │
│                                                             │
│  Campos vazios? ──YES──> Exibir: "Preencha todos os campos"│
│         │                         │                         │
│        NO                         │                         │
│         │                         └──> PERMANECE NA TELA   │
│         ▼                                                   │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          COMPARAÇÃO DE CREDENCIAIS                          │
│                                                             │
│  usuario === "aluno" AND senha === "123" ?                 │
│                                                             │
│         ├─── YES ───> SUCESSO!                              │
│         │                                                   │
│         └─── NO ────> ERRO!                                 │
│                       │                                     │
│                       └─> Exibir: "Credenciais inválidas"  │
│                           PERMANECE NA TELA                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ (Se SUCESSO)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   NAVEGAÇÃO                                 │
│                                                             │
│  navigation.navigate('Success', {                           │
│    nomeUsuario: usuario                                     │
│  })                                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUCCESS SCREEN                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              ✓                                        │  │
│  │     Login Realizado!                                  │  │
│  │                                                       │  │
│  │  Bem-vindo(a), [nome do usuário]!                     │  │
│  │                                                       │  │
│  │  • Dashboard                                          │  │
│  │  • Dados                                              │  │
│  │  • Perfil                                             │  │
│  │                                                       │  │
│  │         [Botão: FAZER LOGOUT]                         │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ (Usuário clica em LOGOUT)
                     ▼
              Volta para LOGIN SCREEN
```

## PSEUDOCÓDIGO DETALHADO
### LoginScreen - Lógica Completa
```pseudocode
COMPONENTE LoginScreen:
    // ========== DECLARAÇÃO DE ESTADOS ==========
    ESTADO usuario = "" (string vazia)
    ESTADO senha = "" (string vazia)
    ESTADO mensagemErro = "" (string vazia)

    // ========== CREDENCIAIS FIXAS ==========
    CONSTANTE CREDENCIAIS_VALIDAS = {
        usuario: "aluno",
        senha: "123"
    }
    // ========== FUNÇÃO DE LOGIN ==========
    FUNÇÃO handleLogin():
        // Passo 1: Limpar mensagem de erro anterior
        mensagemErro ← ""
        
        // Passo 2: Validar se campos estão preenchidos
        SE usuario.trim() == "" OU senha.trim() == "":
            mensagemErro ← "Por favor, preencha todos os campos"
            RETORNAR (sair da função)
        FIM_SE
        
        // Passo 3: Comparar credenciais
        SE usuario == CREDENCIAIS_VALIDAS.usuario E 
           senha == CREDENCIAIS_VALIDAS.senha:
            // Login bem-sucedido
            NAVEGAR_PARA("Success", {
                parametro: nomeUsuario = usuario
            })
            // Limpar campos
            usuario ← ""
            senha ← ""
        SENÃO:
            // Login falhou
            mensagemErro ← "Credenciais inválidas. Tente novamente."
        FIM_SE
    FIM_FUNÇÃO

    // ========== RENDERIZAÇÃO DA INTERFACE ==========
    RENDERIZAR:
        CONTAINER (View):
            TEXTO "Login" (título)
            // Campo de Usuário
            CONTAINER_INPUT:
                LABEL "Usuário:"
                INPUT_TEXTO:
                    placeholder = "Digite seu usuário"
                    valor = usuario
                    aoMudar = setUsuario (atualiza estado)
            FIM_CONTAINER_INPUT
            
            // Campo de Senha
            CONTAINER_INPUT:
                LABEL "Senha:"
                INPUT_TEXTO:
                    placeholder = "Digite sua senha"
                    valor = senha
                    aoMudar = setSenha (atualiza estado)
                    tipoSeguro = TRUE (oculta texto)
            FIM_CONTAINER_INPUT
            
            // Mensagem de Erro (condicional)
            SE mensagemErro != "":
                TEXTO_ERRO mensagemErro (em vermelho)
            FIM_SE

            // Botão de Login
            BOTÃO:
                texto = "Entrar"
                aoClicar = handleLogin
            FIM_BOTÃO
            
            // Dica de credenciais
            TEXTO "Dica: usuário: aluno | senha: 123"
        FIM_CONTAINER
    FIM_RENDERIZAR
FIM_COMPONENTE
```

### SuccessScreen - Lógica Completa
```pseudocode
COMPONENTE SuccessScreen:
    // ========== RECEBER PARÂMETROS ==========
    PARAMETROS recebidos = route.params
    nomeUsuario = PARAMETROS.nomeUsuario OU "Usuário"

    // ========== FUNÇÃO DE LOGOUT ==========
    FUNÇÃO handleLogout():
        NAVEGAR_PARA("Login")
    FIM_FUNÇÃO

    // ========== RENDERIZAÇÃO DA INTERFACE ==========
    RENDERIZAR:
        CONTAINER (View principal):
            // Box de Sucesso
            CONTAINER_SUCESSO:
                ICONE "✓" (grande, verde)
                TEXTO "Login Realizado!" (título)
                TEXTO "Bem-vindo(a), " + nomeUsuario + "!"
                TEXTO "Você acessou a área restrita..."
            FIM_CONTAINER_SUCESSO
            
            // Botão de Logout
            BOTÃO:
                texto = "Fazer Logout"
                aoClicar = handleLogout
                cor = vermelho
            FIM_BOTÃO
            
            // Informações adicionais
            CONTAINER_INFO:
                TEXTO "Funcionalidades disponíveis:"
                TEXTO "• Acesso ao dashboard"
                TEXTO "• Visualização de dados"
                TEXTO "• Configurações de perfil"
                TEXTO "• Relatórios personalizados"
            FIM_CONTAINER_INFO
        FIM_CONTAINER
    FIM_RENDERIZAR
FIM_COMPONENTE
```

### App.js - Configuração de Navegação
```pseudocode
COMPONENTE App:
    CRIAR NavigationContainer:
        CRIAR StackNavigator:
            telaInicial = "Login"
            
            // Configurações globais
            opcoesDeEstilo = {
                corCabeçalho: azul,
                corTexto: branco,
                fontePeso: bold
            }
            
            // Tela 1: Login
            TELA "Login":
                componente = LoginScreen
                opcoes = {
                    titulo: "Tela de Login",
                    mostrarCabeçalho: TRUE
                }
            FIM_TELA
            
            // Tela 2: Success
            TELA "Success":
                componente = SuccessScreen
                opcoes = {
                    titulo: "Área Restrita",
                    mostrarCabeçalho: TRUE,
                    botaoVoltar: FALSE (oculto)
                }
            FIM_TELA
        FIM_StackNavigator
    FIM_NavigationContainer
FIM_COMPONENTE
```

## TABELA DE ESTADOS E TRANSIÇÕES
| Estado Inicial | Ação do Usuário | Validação | Estado Final |
|----------------|-----------------|-----------|--------------|
| LoginScreen | Digita usuário | - | LoginScreen (estado usuario atualizado) |
| LoginScreen | Digita senha | - | LoginScreen (estado senha atualizado) |
| LoginScreen | Clica "Entrar" (campos vazios) | ❌ Falha | LoginScreen + mensagem erro |
| LoginScreen | Clica "Entrar" (credenciais erradas) | ❌ Falha | LoginScreen + mensagem erro |
| LoginScreen | Clica "Entrar" (credenciais corretas) | ✅ Sucesso | SuccessScreen |
| SuccessScreen | Visualiza conteúdo | - | SuccessScreen |
| SuccessScreen | Clica "Fazer Logout" | - | LoginScreen (campos limpos) |

## ALGORITMO DE VALIDAÇÃO PASSO A PASSO
```
ENTRADA: usuario, senha
┌─ PASSO 1: Verificar campos vazios
│  
│  SE usuario.trim() == "" OU senha.trim() == "":
│      RETORNAR mensagem = "Preencha todos os campos"
│      PARAR (não prosseguir)
│  
├─ PASSO 2: Comparar com credenciais fixas
│  
│  SE usuario == "aluno":
│      ├─ SE senha == "123":
│      │    └─> SUCESSO: Navegar para SuccessScreen
│      │        └─> Passar parâmetro: nomeUsuario = "aluno"
│      │
│      └─ SENÃO (senha incorreta):
│           └─> ERRO: mensagem = "Credenciais inválidas"
│  
│  SENÃO (usuario incorreto):
│      └─> ERRO: mensagem = "Credenciais inválidas"
│
└─ PASSO 3: Atualizar interface
   
   SE sucesso:
       - Limpar campos (usuario = "", senha = "")
       - Limpar mensagem de erro
       - Transicionar para próxima tela
   
   SENÃO:
       - Manter campos preenchidos
       - Exibir mensagem de erro em vermelho
       - Permanecer na tela atual

FIM
```

## CASOS DE USO DETALHADOS
### Caso de Uso 1: Login Bem-Sucedido
**Pré-condição:** Usuário está na LoginScreen
1. Usuário digita "aluno" no campo usuário
   - Estado: usuario = "aluno"
2. Usuário digita "123" no campo senha
   - Estado: senha = "123"
3. Usuário clica no botão "Entrar"
4. Sistema valida: campos não vazios ✅
5. Sistema compara: usuario === "aluno" ✅
6. Sistema compara: senha === "123" ✅
7. Sistema limpa campos: usuario = "", senha = ""
8. Sistema navega para SuccessScreen
9. Sistema passa parâmetro: nomeUsuario = "aluno"
10. SuccessScreen exibe: "Bem-vindo(a), aluno!"
**Pós-condição:** Usuário visualiza SuccessScreen

### Caso de Uso 2: Login com Credenciais Inválidas
**Pré-condição:** Usuário está na LoginScreen
1. Usuário digita "aluno" no campo usuário
2. Usuário digita "456" no campo senha (incorreta)
3. Usuário clica no botão "Entrar"
4. Sistema valida: campos não vazios ✅
5. Sistema compara: usuario === "aluno" ✅
6. Sistema compara: senha === "123" ❌ (456 ≠ 123)
7. Sistema atualiza: mensagemErro = "Credenciais inválidas..."
8. Sistema exibe mensagem em vermelho
9. Sistema mantém campos preenchidos
10. Sistema permanece na LoginScreen
**Pós-condição:** Usuário vê mensagem de erro e permanece na tela

### Caso de Uso 3: Tentativa de Login com Campos Vazios
**Pré-condição:** Usuário está na LoginScreen
1. Usuário clica no botão "Entrar" sem preencher campos
2. Sistema valida: usuario === "" ❌
3. Sistema para execução (return)
4. Sistema atualiza: mensagemErro = "Por favor, preencha..."
5. Sistema exibe mensagem em vermelho
6. Sistema permanece na LoginScreen
**Pós-condição:** Usuário vê mensagem de validação

## MATRIZ DE DECISÃO
| Usuário | Senha | Campos Vazios? | Credenciais Corretas? | Resultado |
|---------|-------|----------------|-----------------------|-----------|
| "" | "" | SIM | - | Erro: "Preencha campos" |
| "aluno" | "" | SIM | - | Erro: "Preencha campos" |
| "" | "123" | SIM | - | Erro: "Preencha campos" |
| "aluno" | "123" | NÃO | SIM | ✅ Navega para Success |
| "aluno" | "456" | NÃO | NÃO | Erro: "Credenciais inválidas" |
| "teste" | "123" | NÃO | NÃO | Erro: "Credenciais inválidas" |
| "teste" | "456" | NÃO | NÃO | Erro: "Credenciais inválidas" |

## CICLO DE VIDA DOS ESTADOS
```
[Montagem do Componente]
         │
         ▼
    usuario = ""
    senha = ""
    mensagemErro = ""
         │
         ▼
[Usuário Interage]
         │
         ├─> onChangeText(usuario) ──> setUsuario(valor)
         │                               │
         │                               ▼
         │                        usuario = novo valor
         │                        (Re-renderização)
         │
         ├─> onChangeText(senha) ──> setSenha(valor)
         │                             │
         │                             ▼
         │                      senha = novo valor
         │                      (Re-renderização)
         │
         └─> onPress(handleLogin) ──> Validações
                                       │
                                       ├─> Sucesso
                                       │   │
                                       │   └─> Navegação
                                       │       (Componente desmontado)
                                       │
                                       └─> Erro
                                           │
                                           └─> setMensagemErro(texto)
                                               │
                                               ▼
                                        mensagemErro = texto
                                        (Re-renderização)
```