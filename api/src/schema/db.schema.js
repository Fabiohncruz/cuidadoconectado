// Conectar ao banco de dados usando Mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const DadoMonitoramento = {
  type: { type: String },
  result: Object
};

// Definir o esquema do usuário
const sensorSchema = new mongoose.Schema({
  pessoaId: {
    type: String,
    required: true
  },
  dados: [DadoMonitoramento]
});

// Criar um modelo com o esquema definido
const Dado = mongoose.model('dados', sensorSchema);

const pessoaSchema = new mongoose.Schema({
  usuarioId: {
    doc: 'Determina o Id do Usuário para quem essa pessoa foi cadastrada',
    type: String,
    required: true
  },
  codigoConexao: {
    type: String,
    required: true,
    unique: true
  },
  nome: String,
  dataNascimento: Date,
  dispositivos: [
    {
      deviceId: String,
      ativo: Boolean
    }
  ],
  config: {
    bpm: Boolean,
    pressao: Boolean,
    gps: Boolean
  },
  monitoramento: {
    ultimaLeitura: {
      time: Date,
      dados: DadoMonitoramento
    }
  }
});
const Pessoa = mongoose.model('pessoas', pessoaSchema);


const notificacaoSchema = new mongoose.Schema({
  usuarioId: {
    doc: 'Determina o Id do Usuário para quem essa pessoa foi cadastrada',
    type: String,
    required: true
  },
  descricao: String,
  time: Date,
});
const Notificacao = mongoose.model('notificacoes', notificacaoSchema);

module.exports = {
  Pessoa,
  Dado,
  Notificacao
};