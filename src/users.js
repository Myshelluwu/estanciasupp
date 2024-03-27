const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3000;

const uri = 'mongodb://localhost:27017';
const dbName = 'estancias';
const collectionName = 'users';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });

  app.post('/register', async (req, res) => {
    const data = req.body;
  
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
  
      const result = await collection.insertOne(data);
      console.log(`Se insertó un documento con el ID: ${result.insertedId}`);
      res.send('Datos insertados correctamente');
  
    } catch (error) {
      console.error('Error al insertar datos:', error);
      res.status(500).send('Error al insertar datos');
      
    } finally {
      await client.close();
    }
  });

