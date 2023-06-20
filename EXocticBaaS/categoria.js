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
const Categoria = sequelize.define('Categoria', {
    id_categoria: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false

  },
    id_banner: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
 { freezeTableName: true });


app.use(bodyParser.json());

Categoria.sync({})
  .then(() => {
    console.log('Tabela Usuarios criada com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao criar tabela Usuarios:', error);
  });


app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});



