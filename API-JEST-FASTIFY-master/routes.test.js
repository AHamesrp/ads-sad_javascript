import { app } from './app.js'

// O bloco 'describe' agrupa nossos testes
describe('Testes da API', () => {

    // Teste 1: Verificar se a API está online
    test('Deve retornar status 200 na rota raiz', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe('Olá! A API está funcionando corretamente.')
    })

    // Teste 2: Cadastro de Usuário
    test('Deve cadastrar um novo usuário com sucesso', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/register',
            payload: { 
                name: "Tester Jest",
                email: "teste@jest.com",
                password: "123"
            }
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.body).message).toBe('Usuário cadastrado com sucesso!')
    })

    // Teste 3: Login com Sucesso
    test('Deve fazer login com credenciais corretas', async () => {
        // Como os testes rodam em ordem e usam a memória, o usuário criado acima ainda existe aqui.
        const response = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                email: "teste@jest.com",
                password: "123"
            }
        })

        expect(response.statusCode).toBe(200)
        const body = JSON.parse(response.body)
        expect(body.message).toBe('Login realizado com sucesso!')
        expect(body.user).toBe('Tester Jest')
    })

    // Teste 4: Login com Falha (senha incorreta)
    test('Deve negar login com senha incorreta', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                email: "teste@jest.com",
                password: "senhaerrada" // Senha propositalmente errada
            }
        })

        expect(response.statusCode).toBe(401) // 401 = Não autorizado
        expect(JSON.parse(response.body).message).toBe('Email ou senha incorretos.')
    })

    // Teste 5: Desafio RPG - Criar e Listar Personagem
    test('Deve salvar e listar um personagem de RPG', async () => {
        // 1. Criar personagem (Simulando um POST)
        await app.inject({
            method: 'POST',
            url: '/personagens',
            payload: { name: 'Aragorn', classe: 'Guerreiro', nivel: 10 }
        })

        // 2. Listar personagens (Simulando um GET)
        const response = await app.inject({
            method: 'GET',
            url: '/personagens'
        })

        // Validação: Verifique se o corpo da resposta contém o nome "Aragorn"
        // Nota: response.body vem como string JSON, o .toContain procura texto nela
        expect(response.body).toContain('Aragorn') 
        expect(response.statusCode).toBe(200)
    })

})
