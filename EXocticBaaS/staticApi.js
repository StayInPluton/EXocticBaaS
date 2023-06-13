const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

const produtos = {
    "produtos": [
        {
            "id": 1,
            "preco": 50.00,
            "imagem": "caminhada_na_floresta.jpg",
            "descricao": "Explore uma floresta exuberante em uma caminhada guiada por especialistas.",
            "nome": "Caminhada na Floresta",
            "categoria": "Aventura"
        },
        {
            "id": 2,
            "preco": 80.00,
            "imagem": "mergulho_em_recife.jpg",
            "descricao": "Descubra a beleza subaquática de um recife de coral em um mergulho emocionante.",
            "nome": "Mergulho em Recife",
            "categoria": "Aventura"
        },
        {
            "id": 3,
            "preco": 120.00,
            "imagem": "jantar_sob_as_estrelas.jpg",
            "descricao": "Desfrute de um jantar romântico sob as estrelas com um cardápio exclusivo.",
            "nome": "Jantar sob as Estrelas",
            "categoria": "Romântico"
        },
        {
            "id": 4,
            "preco": 200.00,
            "imagem": "escalada_na_montanha.jpg",
            "descricao": "Experimente a emoção da escalada em uma montanha desafiadora.",
            "nome": "Escalada na Montanha",
            "categoria": "Aventura"
        },
        {
            "id": 5,
            "preco": 150.00,
            "imagem": "passeio_de_bicicleta.jpg",
            "descricao": "Faça um passeio de bicicleta pelas trilhas panorâmicas da região.",
            "nome": "Passeio de Bicicleta",
            "categoria": "Aventura"
        },
        {
            "id": 6,
            "preco": 180.00,
            "imagem": "massagem_relaxante.jpg",
            "descricao": "Relaxe e renove suas energias com uma massagem relaxante.",
            "nome": "Massagem Relaxante",
            "categoria": "Bem-estar"
        },
        {
            "id": 7,
            "preco": 100.00,
            "imagem": "tour_gastronomico.jpg",
            "descricao": "Descubra os sabores locais em um tour gastronômico imperdível.",
            "nome": "Tour Gastronômico",
            "categoria": "Culinária"
        },
        {
            "id": 8,
            "preco": 75.00,
            "imagem": "passeio_de_barco.jpg",
            "descricao": "Navegue pelas águas cristalinas em um relaxante passeio de barco.",
            "nome": "Passeio de Barco",
            "categoria": "Passeio"
        },
        {
            "id": 9,
            "preco": 90.00,
            "imagem": "aula_de_surf.jpg",
            "descricao": "Aprenda a surfar com instrutores experientes em uma aula divertida.",
            "nome": "Aula de Surf",
            "categoria": "Esporte"
        },
        {
            "id": 10,
            "preco": 130.00,
            "imagem": "passeio_de_cavalo.jpg",
            "descricao": "Curta a natureza em um agradável passeio a cavalo pela região.",
            "nome": "Passeio de Cavalo",
            "categoria": "Aventura"
        }
    ]
};

app.get('/', (req, res) => {
    res.send(produtos);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const usersData = fs.readFileSync('users.json');
    const users = JSON.parse(usersData).users;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login bem-sucedido!' });
    } else {
        res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
