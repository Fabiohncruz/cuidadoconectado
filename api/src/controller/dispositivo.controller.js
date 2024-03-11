const { Pessoa } = require('../schema/db.schema');
const { createCustomToken } = require('../firebase/firebase');

module.exports.registrarDispositivo = async (req, res) => {
  const { codigoConexao, deviceId } = req.body;

  const pessoa = await Pessoa.findOneAndUpdate({ codigoConexao }, {
    $push: {
      dispositivos: {
        deviceId,
        ativo: true
      }
    }
  });
  if (!pessoa) {
    res.status(400).send({
      message: 'Código não encontrado'
    });
    return;
  }

  // Criar um Token que precisa ser usado no dispositivo para fazer o login
  const token = await createCustomToken(pessoa.usuarioId);

  res.status(200).send({
    pessoaId: pessoa._id.toString(),
    token
  });
};