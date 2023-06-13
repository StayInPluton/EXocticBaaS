const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dados dos administradores (exemplo)
let admins = [];

// Rota POST para cadastrar um novo administrador
app.post('/admin/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se o nome, email e senha foram fornecidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são campos obrigatórios.' });
  }

  // Cria um novo administrador
  const novoAdmin = { nome, email, senha };

  // Adiciona o novo administrador à lista de administradores
  admins.push(novoAdmin);

  // Retorna o novo administrador cadastrado
  res.json(novoAdmin);
});

// Rota GET para obter todos os administradores
app.get('/admin', (req, res) => {
  res.json(admins);
});

// Rota DELETE para excluir um administrador pelo nome
app.delete('/admin/:nome', (req, res) => {
  const nome = req.params.nome;

  // Procura pelo administrador pelo nome
  const index = admins.findIndex(admin => admin.nome === nome);

  // Verifica se o administrador foi encontrado
  if (index === -1) {
    return res.status(404).json({ error: 'Administrador não encontrado.' });
  }

  // Remove o administrador da lista
  const adminRemovido = admins.splice(index, 1);

  // Retorna o administrador removido
  res.json(adminRemovido);
});

// Rota GET para visualizar as atividades do administrador pelo nome
app.get('/admin/:nome/atividades', (req, res) => {
  const nome = req.params.nome;

  // Procura pelo administrador pelo nome
  const admin = admins.find(admin => admin.nome === nome);

  // Verifica se o administrador foi encontrado
  if (!admin) {
    return res.status(404).json({ error: 'Administrador não encontrado.' });
  }

  // Exemplo de atividades do administrador (pode ser substituído pela lógica adequada)
  const atividades = [
    { id: 1, descricao: 'Atividade 1' },
    { id: 2, descricao: 'Atividade 2' },
    { id: 3, descricao: 'Atividade 3' }
  ];

  // Retorna as atividades do administrador
  res.json(atividades);
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('API iniciada na porta 3000');
});
