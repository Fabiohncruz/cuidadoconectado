
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://fabiohncruz:davi2020@cluster0.ycldgpn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
 
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = await client.db("cuidado-conectado");
    
    const usuariosCollection = db.collection('usuarios');
    await usuariosCollection.insertOne({
        nome: 'Fabio Henrique',
        email: 'fabiohncruz@hotmail.com',
        endereco: {
            rua: 'Rua Xambre, 366',
            cidade: 'Colombo',
            estado: 'Paraná'
        }
    });

    const usuario = await usuariosCollection.findOne({ nome: 'Fabio Henrique' });

    console.log(usuario)




}
run().catch(console.dir);
