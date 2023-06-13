const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Rota para autenticar o usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verifica se o email e senha foram fornecidos
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    res.json({ message: 'Login bem-sucedido.' });
});

app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
