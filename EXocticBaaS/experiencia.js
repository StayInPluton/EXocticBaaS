const express = require('express');
const app = express();
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

    const Experiencia = sequelize.define('Experiencia', {
      id_experiencias: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_de_venda: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      informacoes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preco: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      experienciascol: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      venda_id_venda: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      freezeTablename: true,
    });
    ;

    Experiencia.sync({})
  .then(() => {
    console.log('Tabela Experiencia criada com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao criar tabela Experiencia:', error);
  });


// Rota para cadastrar uma nova experiência
app.get("/cadastro", (req, res) => {
  const { id_experiencias,
    nome,
    informacoes,
    preco,
    experienciascol,
    id_categoria,
    venda_id_venda } = req.body;

  // Verifica se todos os campos foram fornecidos
  //if (!nome || !codigo || !informacoes || !preco) {
    //return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  //}

  // Cria um nova experiência
  Experiencia.create({
    id_experiencias,
    nome,
    informacoes,
    preco,
    experienciascol,
    id_categoria,
    venda_id_venda
  })
      .then(() => {
          res.json({ message: 'Experiencia cadastrado com sucesso.' });
      })
      .catch((error) => {
          console.log('Erro ao cadastrar Experiencia:', error);
          res.status(500).json({ error: 'Erro ao cadastrar Experiencia.' });
      });
});

app.listen(3000, () => {
  console.log("Servidor está ouvindo na porta 3000");
});
