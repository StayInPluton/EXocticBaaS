const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

// Rota para cadastrar uma nova experiência
app.get("/cadastro", (req, res) => {
  const { nome, codigo, informacoes, preco } = req.body;

  // Verifica se todos os campos foram fornecidos
  if (!nome || !codigo || !informacoes || !preco) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Cria um nova experiência
  const novaExperiencia = {
    nome,
    codigo,
    informacoes,
    preco,
  };

  res.json({ message: "Experiência cadastrada com sucesso." });
});

app.listen(3000, () => {
  console.log("Servidor está ouvindo na porta 3000");
});
