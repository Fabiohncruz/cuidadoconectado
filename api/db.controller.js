const criarCrud = function(app, recurso, schema){

    // Rotas CRUD para usuários
    app.post(`/${recurso}`, async (req, res) => {
        try {
            const newUser = new schema(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.get(`/${recurso}`, async (req, res) => {
        try {
            const users = await schema.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get(`/${recurso}/:id`, async (req, res) => {
        try {
            const user = await schema.findById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: `${recurso} não encontrado` });
        }
    });

    app.put(`/${recurso}/:id`, async (req, res) => {
        try {
            const user = await schema.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: `${recurso} não encontrado` });
        }
    });

    app.delete(`/${recurso}/:id`, async (req, res) => {
        try {
            await schema.findByIdAndDelete(req.params.id);
            res.json({ message: `${recurso} excluido com sucesso` });
        } catch (error) {
            res.status(404).json({ error: `${recurso} não encontrado` });
        }
    });
}

module.exports = {
    criarCrud
}