const express = require('express');
const cors = require('cors');
const {  Pessoa, Notificacao } = require('./schema/db.schema');
const { criarCrud } = require('./controller/db.controller');
const { getAllUsers, getUserById, saveUser, updateUser, deleteUserById } = require('./firebase/firebase');
const { registrarDispositivo } = require('./controller/dispositivo.controller');
const auth = require('./middleware/auth');
const { registrarDados } = require('./controller/dados.controller');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

// Cria crud de pessoas, onde retorna apenas registros criados pelo usuário logado
app.use('/pessoas', auth(), criarCrud(Pessoa, { onlyOwn: true }));

app.use('/notificacoes', auth(), criarCrud(Notificacao, { onlyOwn: true }));

app.post('/dispositivos', registrarDispositivo);

app.post('/usuarios', auth(), saveUser);
app.get('/usuarios', auth(), getAllUsers);
app.get('/usuarios/:id', auth(), getUserById);
app.patch('/usuarios/:id', auth(), updateUser);
app.put('/usuarios/:id', auth(), updateUser);
app.delete('/usuarios/:id', auth(), deleteUserById);
app.post('/dados', registrarDados);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API iniciada em: http://localhost:${port}`);
});