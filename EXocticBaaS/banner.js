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

    app.use(bodyParser.json());


// Definição do modelo
const Banner = sequelize.define('Banner', {
    id_banner: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    preco: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    id_administracao: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    categoria_id_categoria: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    experiencias_id_experiencias: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });
  

Banner.sync({})
  .then(() => {
    console.log('Tabela Banner criada com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao criar tabela Banner:', error);
  });


// Rota para cadastrar um novo usuário
app.post('/banner', (req, res) => {
    const { id_banner,
      descricao,
      url,
      preco,
      id_administracao,
      categoria_id_categoria,
      experiencias_id_experiencias } = req.body;


    //if (!nome || !email || !cpf || !senha || !numero_telefone || !nascimento) {
      //  return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    //}


    Banner.create({
      id_banner,
      descricao,
      url,
      preco,
      id_administracao,
      categoria_id_categoria,
      experiencias_id_experiencias
    })
        .then(() => {
            res.json({ message: 'Banner cadastrado com sucesso.' });
        })
        .catch((error) => {
            console.log('Erro ao cadastrar o Banner:', error);
            res.status(500).json({ error: 'Erro ao cadastrar Banner.' });
        });
});


app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});



