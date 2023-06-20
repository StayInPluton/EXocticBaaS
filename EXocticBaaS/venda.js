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
const Venda = sequelize.define('Venda', {
    id_venda: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contato: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    id_experiencia: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    usuario_id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });



app.use(bodyParser.json());

Venda.sync({})
  .then(() => {
    console.log('Tabela Vendas criada com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao criar tabela Vendas:', error);
  });


// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { id_venda,contato, valor, id_experiencia, id_usuario,usuario_id_usuario} = req.body;


    //if (!nome || !email || !cpf || !senha || !numero_telefone || !nascimento) {
      //  return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    //}


    Venda.create({
      id_venda,
      contato, 
      valor, 
      id_experiencia, 
      id_usuario,
      usuario_id_usuario
    })
        .then(() => {
            res.json({ message: 'Venda cadastrada com sucesso.' });
        })
        .catch((error) => {
            console.log('Erro ao cadastrar o Venda:', error);
            res.status(500).json({ error: 'Erro ao cadastrar o Venda.' });
        });
});


app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});



