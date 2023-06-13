const express = require('express');
const fs = require('fs');

const app = express();
const usersFilePath = 'users.json';

app.delete('/delete', (req, res) => {
    const { id } = req.params;

    // Lê o arquivo users.json
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao excluir o usuário' });
        }

        let users = JSON.parse(data);

        // Verifica se o usuário com o ID fornecido existe no arquivo users.json
        const userIndex = users.cadastro.findIndex(user => user.id === id);

        if (userIndex === -1) {
            // Usuário não encontrado
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Remove o usuário do array users
        users.cadastro.splice(userIndex, 1);

        // Atualiza o arquivo users.json com o array atualizado
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensagem: 'Erro ao excluir o usuário' });
            }

            // Usuário excluído com sucesso
            return res.json({ mensagem: 'Usuário excluído com sucesso' });
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
