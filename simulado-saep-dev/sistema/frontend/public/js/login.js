/**
 * Script de Login
 * Gerencia autenticação do usuário
 */

const API_URL = 'http://localhost:3000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const errorDiv = document.getElementById('errorMessage');

    try {
        // Fazer requisição de login
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Salvar token no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirecionar para dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Exibir erro
            errorDiv.textContent = data.error || 'Erro ao fazer login';
            errorDiv.style.display = 'block';

            // Limpar senha
            document.getElementById('senha').value = '';
        }

    } catch (error) {
        console.error('Erro:', error);
        errorDiv.textContent = 'Erro ao conectar com o servidor. Verifique se o backend está rodando.';
        errorDiv.style.display = 'block';
    }
});
