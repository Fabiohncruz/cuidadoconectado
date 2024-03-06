// app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { criarCrud } = require('./db.controller');
const { getAllUsers, getUserById, saveUser, updateUser, deleteUserById } = require('./firebase.controller');
const { Sensor, Pulseira } = require('./db.schema');
const { registrarPulseira } = require('./pulseira.controller');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

criarCrud(app, 'dados', Sensor);
criarCrud(app, 'pulseiras', Pulseira);

app.post('/monitoramento/registrar', registrarPulseira);

app.post('/usuarios', saveUser);
app.get('/usuarios', getAllUsers);
app.get('/usuarios/:id', getUserById);
app.patch('/usuarios/:id', updateUser);
app.put('/usuarios/:id', updateUser);
app.delete('/usuarios/:id', deleteUserById);


app.get('/usuarios/:id/dados', async (req, res) => {
  try {
    const query = {
      userId: req.params.id
    };

    // verificar se existe uma queryParam pulseiraId para fazer a query
    if (req.query.pulseiraId) {
      query.pulseiraId = req.query.pulseiraId;
    }
    const dados = await Sensor.find(query);
    res.json(dados);
  } catch (error) {
    res.status(404).json({ error: `${recurso} não encontrado` });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`API iniciada em: http://localhost:${port}`);
});
