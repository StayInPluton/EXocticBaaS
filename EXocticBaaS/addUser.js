const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('exoctic', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


sequelize.authenticate()
    .then(function () {
        console.log("Conectado ao banco de dados com sucesso!");
    })
    .catch(function (erro) {
        console.log("Erro ao conectar ao banco de dados: " + erro);
    });


// Definição do modelo
const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    cpf: {
        type: Sequelize.BIGINT,
        unique:true,
        allowNull:false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_telefone: {
        type: Sequelize.BIGINT,
        allowNull:false
    },
    nascimento: {
        type: Sequelize.DATE,
        allowNull:false
    }


}, { freezeTableName: true });


app.use(bodyParser.json());

Usuario.sync({})
  .then(() => {
    console.log('Tabela Usuarios criada com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao criar tabela Usuarios:', error);
  });


// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { id_usuario, nome, email, cpf, senha, numero_telefone, nascimento } = req.body;


    if (!nome || !email || !cpf || !senha || !numero_telefone || !nascimento) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }


    Usuario.create({
        id_usuario,
        nome,
        email,
        cpf,
        senha,
        numero_telefone,
        nascimento
    })
        .then(() => {
            res.json({ message: 'Usuário cadastrado com sucesso.' });
        })
        .catch((error) => {
            console.log('Erro ao cadastrar o usuário:', error);
            res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
        });
});


app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});



