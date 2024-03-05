// Conectar ao banco de dados usando Mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o esquema do usuário
const sensorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  pulseiraId: {
    type: String,
    required: true
  }
});
// Criar um modelo com o esquema definido
const Sensor = mongoose.model('dados', sensorSchema);

const pulseriaSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    required: true
  },
  apelido: String,
  codigoConexao: {
    type: String,
    required: true,
    unique: true
  },
  deviceId: {
    type: String,
    unique: true
  },
  ativa: {
    type: Boolean,
    default: false
  },
  deviceCode: Number
});
const Pulseira = mongoose.model('pulseiras', pulseriaSchema);

module.exports = {
  Pulseira,
  Sensor
};