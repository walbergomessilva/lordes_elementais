const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Usar variáveis de ambiente para credenciais de segurança
const supabaseUrl = process.env.SUPABASE_URL || 'https://waucxamcigbaolwdyfpz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhdWN4YW1jaWBiYW9sd2R5ZnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTY1MDMsImV4cCI6MjA1ODQ5MjUwM30.upnFuCH1jsYuwnh5BJMtvUJfjT0-WkHK4b-C5Xwq_EI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { email, password, nome } = req.body;

    try {
        // Realiza o cadastro do usuário
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Após o cadastro, insere o nome do usuário na tabela 'usuarios'
        const { error: insertError } = await supabase
            .from('usuarios') // Nome da tabela
            .insert([{
                id: data.user.id, // ID do usuário retornado do cadastro
                nome,
                email
            }]);

        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }

        res.json({ message: 'Cadastro realizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.json({ message: 'Login bem-sucedido!', token: data.session.access_token });
});

// Rota para verificar se o usuário está logado
app.get('/session', async (req, res) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);

    const saveFicha = async () => {
  const { data, error } = await supabase
    .from('fichas')
    .upsert([
      {
        user_id: user.id,  // ID do usuário autenticado
        campo1: valor1,
        campo2: valor2,
        // ... (outros campos da ficha)
      }
    ]);

  if (error) {
    console.error('Erro ao salvar ficha:', error);
  } else {
    console.log('Ficha salva com sucesso:', data);
  }
};

});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
