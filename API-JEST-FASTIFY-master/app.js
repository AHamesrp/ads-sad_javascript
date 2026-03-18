import Fastify from 'fastify'
const app = Fastify()

// --- Banco de Dados em Memória ---
const users = []
const personagens = []

// --- Rota Raiz ---
app.get('/', () => {
    return 'Olá! A API está funcionando corretamente.'
})

// --- Rotas de Usuário ---
app.post('/register', (request, reply) => {
    const newUser = request.body
    users.push(newUser)
    return reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' })
})

app.post('/login', (request, reply) => {
    const { email, password } = request.body
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
        return { message: 'Login realizado com sucesso!', user: user.name }
    } else {
        return reply.status(401).send({ message: 'Email ou senha incorretos.' })
    }
})

// --- Rotas de RPG (Desafio) ---
app.post('/personagens', (request, reply) => {
    const novoPersonagem = request.body
    personagens.push(novoPersonagem)
    return reply.status(201).send({ message: 'Personagem criado!' })
})

app.get('/personagens', () => {
    return personagens
})

// Exportamos o app para poder testá-lo sem rodar o servidor
export { app }
