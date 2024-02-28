require('dotenv').config()
const express = require("express");
const { MongoClient, ObjectId, Collection } = require("mongodb");

//Connecting to mongoDB
const dbUrl = process.env.DB_URL;
const dbName = "OceanJornadaBackendFev2024";

async function main() {
  const client = new MongoClient(dbUrl);

  console.log("Conectando com o banco de dados...");
  await client.connect();
  console.log("Conectado com sucesso!!!");

  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", function (req, res) {
    res.send("Ola Mundo");
  });

  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName)
  const colletction = db.collection('itens')

  //Read all -> [GET] /item
  app.get("/item", async function (req, res) { 
    const items = await colletction.find().toArray()
    res.send(items);
  });

  //Read by ID
  app.get("/item/:id", async function (req, res) {
    const id = req.params.id;
    const item = await colletction.findOne({
      _id: new ObjectId(id)
    });

    res.send(item);
  });

  //Corpo da requisicao em jason
  app.use(express.json());

  //Add item
  app.post("/item", async function (req, res) {
    const item = req.body
    await colletction.insertOne(item)

    res.send(item);
  });

  //Update -> [PUT]
  app.put("/item/:id", async function(req, res){
    const id = req.params.id //Get the id from the route /item/id
    const novoItem = req.body //New item from the body of request

    await colletction.updateOne( 
      { _id: new ObjectId(id)},
      { $set: novoItem }
    )

    res.send('Item atualizado com sucesso!!!')
  })

  //DELETE -> [DELETE]
  app.delete("/item/:id", async function(req, res){
    const id = req.params.id

    await colletction.deleteOne({ _id: new ObjectId(id)})

    res.send("item deletado com sucesso!!!")

  })


  app.listen(3000);
}

main();
