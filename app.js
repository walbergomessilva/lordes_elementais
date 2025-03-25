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
        document.getElementById('idade').disabled = false;
        document.getElementById('pais').disabled = false;
        document.getElementById('etnia').disabled = false;
        document.getElementById('cor_olhos').disabled = false;
        document.getElementById('cor_cabelos').disabled = false;
        document.getElementById('altura').disabled = false;
        document.getElementById('peso').disabled = false;
        document.getElementById('profissao').disabled = false;
        document.getElementById('hobby').disabled = false;
        document.getElementById('classe').disabled = false;
        document.getElementById('zodiaco').disabled = false;
        document.getElementById('dom').disabled = false;
        document.getElementById('personalidade').disabled = false;
        // Adicione outros campos conforme necessário
    }
};

const API_URL = 'http://localhost:3001'; // URL do backend (ou Supabase se estiver configurado diretamente)

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
        window.location.href = "ficha.html"; // Redireciona para a página da ficha
    }
}

// Função para salvar dados da ficha no Supabase
async function saveFicha() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado para salvar os dados.");
        return;
    }

    const userId = localStorage.getItem("user_id"); // Supondo que o ID do usuário seja salvo após o login

    const ficha = {
        usuario_id: userId, // ID do usuário
        nivel: document.getElementById('nivel').value,
        arma: document.getElementById('arma').value,
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        pais: document.getElementById('pais').value,
        etnia: document.getElementById('etnia').value,
        cor_olhos: document.getElementById('cor_olhos').value,
        cor_cabelos: document.getElementById('cor_cabelos').value,
        altura: document.getElementById('altura').value,
        peso: document.getElementById('peso').value,
        profissao: document.getElementById('profissao').value,
        hobby: document.getElementById('hobby').value,
        classe: document.getElementById('classe').value,
        zodiaco: document.getElementById('zodiaco').value,
        dom: document.getElementById('dom').value,
        personalidade: document.getElementById('personalidade').value,
        vitalidade: document.getElementById('vitalidade').value,
        aura: document.getElementById('aura').value,
        mana: document.getElementById('mana').value,
        agilidade: document.getElementById('agilidade').value,
        reflexo: document.getElementById('reflexo').value,
        forca: document.getElementById('forca').value,
        destreza: document.getElementById('destreza').value,
        defesa: document.getElementById('defesa').value,
        resistencia: document.getElementById('resistencia').value,
        academicos: document.getElementById('academicos').value,
        sabedoria: document.getElementById('sabedoria').value,
        logica: document.getElementById('logica').value,
        memoria: document.getElementById('memoria').value,
        percepcao: document.getElementById('percepcao').value,
        concentracao: document.getElementById('concentracao').value,
        dom_arma: document.getElementById('dom_arma').value,
        arma_z: document.getElementById('arma_z').value,
        sensibilidade: document.getElementById('sensibilidade').value,
        escudo_z: document.getElementById('escudo_z').value,
        des_magica: document.getElementById('des_magica').value,
        transformacao: document.getElementById('transformacao').value,
        // Adicione outros campos conforme necessário
    };

    const response = await fetch(`${API_URL}/ficha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ficha),
    });

    const data = await response.json();
    if (data.error) {
        alert("Erro ao salvar a ficha: " + data.error);
    } else {
        alert("Ficha salva com sucesso!");
    }
}
