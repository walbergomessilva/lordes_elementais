// Habilita os campos da ficha após a verificação do login
window.onload = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa fazer login para acessar esta página.");
        window.location.href = "index.html";  // Altere para a página de login
    } else {
        // Habilita os campos
        document.getElementById('nome').disabled = false;
        document.getElementById('email').disabled = false;
        // Faça isso para todos os outros campos da ficha
    }
};

const API_URL = 'http://localhost:3001'; // URL do backend

// Função para cadastro de usuário
async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.error) {
        alert("Erro: " + data.error);
    } else {
        alert("Cadastro realizado! Agora faça login.");
    }
}

// Função para login de usuário
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.error) {
        alert("Erro: " + data.error);
    } else {
        alert("Login bem-sucedido!");
        localStorage.setItem("token", data.session.access_token);
        window.location.href = "ficha.html"; // Redireciona para outra página
    }
}
