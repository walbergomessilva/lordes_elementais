const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient('SUA_URL_SUPABASE', 'SUA_CHAVE_API');

// Rota para buscar todas as fichas
app.get('/fichas', async (req, res) => {
    const { data, error } = await supabase.from('fichas').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Rota para atualizar uma ficha
app.put('/fichas/:id', async (req, res) => {
    const { id } = req.params;
    const { agilidade, forca, destreza } = req.body;
    
    const { data, error } = await supabase
        .from('fichas')
        .update({ agilidade, forca, destreza })
        .match({ id });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));