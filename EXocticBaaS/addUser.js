const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, cpf, senha } = req.body;

    // Verifica se todos os campos foram fornecidos
    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se o usuário já está cadastrado (pelo email ou CPF)
    const usuarioData = fs.readFileSync('users.json');
    const usuarios = JSON.parse(usuarioData).usuarios;
    const usuarioExistente = usuarios.find(
        (usuario) => usuario.email === email || usuario.cpf === cpf
    );
    if (usuarioExistente) {
        return res.status(409).json({ error: 'Usuário já cadastrado.' });
    }

    // Cria um novo usuário
    const novoUsuario = {
        nome,
        email,
        cpf,
        senha,
    };

    // Salva o novo usuário no arquivo usuario.json
    usuarios.push(novoUsuario);
    fs.writeFileSync('users.json', JSON.stringify({ usuarios }));

    res.json({ message: 'Usuário cadastrado com sucesso.' });
});

app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
