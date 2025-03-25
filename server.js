const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Usar variáveis de ambiente para credenciais de segurança
const supabaseUrl = process.env.SUPABASE_URL || 'https://waucxamcigbaolwdyfpz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sua_chave_aqui';
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ error: error.message });
    res.json(data); // Inclui o token de autenticação no retorno
});

// Rota para verificar se o usuário está logado
app.get('/session', async (req, res) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
