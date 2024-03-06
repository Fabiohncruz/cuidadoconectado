// Função para formatar os registros que vem do Banco de Dados para a API
// O App web precisa que os ids sejam enviados como "id" ao invés de "_id"
const formatDocuments = document => {
  const values = document.toJSON();
  const { _id, __v, ...rest } = values;
  return {
    id: _id,
    ...rest
  };
};

const criarCrud = function(app, recurso, schema) {

  // Rota CRUD para Criar um Recurso
  app.post(`/${recurso}`, async (req, res) => {
    try {
      const newDocument = new schema(req.body);
      const saved = await newDocument.save();
      res.status(201).json(formatDocuments(saved));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Rota CRUD para Recupear uma Lista com varios recursos
  app.get(`/${recurso}`, async (req, res) => {
    try {
      const documents = await schema.find();
      res.json({
        data: documents.map(formatDocuments),
        total: documents.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Rota CRUD para Recupear um Recurso pelo seu ID
  app.get(`/${recurso}/:id`, async (req, res) => {
    try {
      const document = await schema.findById(req.params.id);
      res.json(formatDocuments(document));
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  // Rota CRUD para Atualizar Integralmente um Recurso pelo seu ID
  app.put(`/${recurso}/:id`, async (req, res) => {
    try {
      const document = await schema.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.json(document);
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  // Rota CRUD para Atualizar Integralmente um Recurso Parcialmente pelo seu ID
  app.patch(`/${recurso}/:id`, async (req, res) => {
    try {
      const document = await schema.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      res.json({
        id: req.params.id,
        data: document.toJSON()
      });
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  // Rota CRUD para Excluir um um Recurso pelo seu ID
  app.delete(`/${recurso}/:id`, async (req, res) => {
    try {
      await schema.findByIdAndDelete(req.params.id);
      res.json({ message: `${recurso} excluido com sucesso` });
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  }); 
};

module.exports = {
  criarCrud
};