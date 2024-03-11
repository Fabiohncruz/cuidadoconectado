// Função para formatar os registros que vem do Banco de Dados para a API
// O App web precisa que os ids sejam enviados como "id" ao invés de "_id"
const express = require('express');
const auth = require('../middleware/auth');
const formatDocuments = document => {
  const values = document.toJSON();
  const { _id, __v, ...rest } = values;
  return {
    id: _id,
    ...rest
  };
};

/**
 * Cria todas as rotas CRUD para um recurso definido por seu schema
 * @param app
 * @param recurso o path do recurso que será cruadi
 * @param schema o schema do mongodb
 * @param byUserId define se a lógica deve trazer apenas documentos criados por um usuário
 */
const criarCrud = function(schema, options) {
  const recurso = schema.name;
  const router = express.Router();

  // Rota CRUD para Criar um Recurso
  router.post(`/`, async (req, res) => {
    try {
      const newDocument = new schema(req.body);
      const saved = await newDocument.save();
      res.status(201).json(formatDocuments(saved));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Rota CRUD para Recupear uma Lista com varios recursos
  router.get(`/`, async (req, res) => {
    try {
      let filter = {};
      if(options.onlyOwn){
        filter.usuarioId = req.principal.id;
      }
      const documents = await schema.find(filter);
      res.json({
        data: documents.map(formatDocuments),
        total: documents.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Rota CRUD para Recupear um Recurso pelo seu ID
  router.get(`/:id`, async (req, res) => {
    try {
      let filter = {
        _id: req.params.id
      };
      if(options.onlyOwn){
        filter.usuarioId = req.principal.id;
      }
      const document = await schema.findOne(filter);
      res.json(formatDocuments(document));
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  // Rota CRUD para Atualizar Integralmente um Recurso pelo seu ID
  router.put(`/:id`, async (req, res) => {
    try {
      let filter = {
        _id: req.params.id
      };
      if(options.onlyOwn){
        filter.usuarioId = req.principal.id;
      }
      const document = await schema.findOneAndUpdate(filter, req.body, {
        new: true
      });
      res.json(document);
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  // Rota CRUD para Atualizar Integralmente um Recurso Parcialmente pelo seu ID
  router.patch(`/:id`, async (req, res) => {
    try {
      let filter = {
        _id: req.params.id
      };
      if(options.onlyOwn){
        filter.usuarioId = req.principal.id;
      }
      const document = await schema.findOneAndUpdate(filter, {
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
  router.delete(`/:id`, async (req, res) => {
    try {
      let filter = {
        _id: req.params.id
      };
      if(options.onlyOwn){
        filter.usuarioId = req.principal.id;
      }
      await schema.findOneAndDelete(filter);
      res.json({ message: `${recurso} excluido com sucesso` });
    } catch (error) {
      res.status(404).json({ error: `${recurso} não encontrado` });
    }
  });

  return router;
};

module.exports = {
  criarCrud
};