/**
 * Script do Dashboard
 * Gerencia a página principal após login
 */

// Verificar se usuário está logado
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
    window.location.href = 'login.html';
}

// Exibir informações do usuário
document.getElementById('userName').textContent = user.nome || user.login;
document.getElementById('userType').textContent = user.tipo || '';

// Função de logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}
