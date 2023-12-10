// app.js

const express = require('express');
const mongoose = require('mongoose');
const { criarCrud } = require('./db.controller');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados usando Mongoose
mongoose.connect('mongodb+srv://fabiohncruz:davi2020@cluster0.ycldgpn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante que o e-mail seja único
    },
    endereco: {
        rua: String,
        cidade: String,
        estado: String
    }
});
// Criar um modelo com o esquema definido
const User = mongoose.model('usuarios', userSchema);

// Definir o esquema do usuário
const sensorSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    pulseiraId: {
        type: ObjectId,
        required: true
    },
    bpm: Number

});
// Criar um modelo com o esquema definido
const Sensor = mongoose.model('dados', sensorSchema);

const pulseriaSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    deviceCode: Number
});
// Criar um modelo com o esquema definido
const Pulseira = mongoose.model('pulseiras', pulseriaSchema);



app.use(express.json());

criarCrud(app, 'usuarios', User);
criarCrud(app, 'dados', Sensor);
criarCrud(app, 'pulseiras', Pulseira);

app.get('/usuarios/:id/dados', async (req, res) => {
    try {
        const query = {
            userId: req.params.id
        };

        // verificar se existe uma queryParam pulseiraId para fazer a query
        if(req.query.pulseiraId){
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
  console.log(`Server is running on port ${port}`);
});
