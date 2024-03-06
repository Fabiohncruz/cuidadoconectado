const { Pulseira } = require('./db.schema');

module.exports.registrarPulseira = async (req, res) => {
  const { codigoConexao, deviceId } = req.body;


  const pulseira = await Pulseira.findOne({ codigoConexao });
  if (!pulseira) {
    res.status(400).send({
      message: 'Código não encontrado'
    });
    return;
  }

  await Pulseira.updateOne({ codigoConexao }, {
    $set: {
      ativa: true,
      deviceId
    }
  });

  res.send({
    pulseiraId: pulseira.id,
    apelido: pulseira.apelido,
    ativa: true
  });
};