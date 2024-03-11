const { Pessoa, Dado } = require('../schema/db.schema');

module.exports.registrarDados = async (req, res) => {
  const pessoaId = req.body.pessoaId;
  const dados = req.body.dados;

  const pessoa = await Pessoa.findById(pessoaId);
  if (!pessoa) {
    res.status(400).send({ message: 'pessoa não encontrada' });
    return;
  }

  console.log(new Date(), `Processando dados de ${pessoaId}`);

  await Dado.create({
    pessoaId,
    dados
  });

  await Pessoa.findByIdAndUpdate(pessoaId, {
    $set: {
      monitoramento: {
        ultimaLeitura: {
          time: new Date(),
          dados
        }
      }
    }
  });

  res.status(201).send({});
};
