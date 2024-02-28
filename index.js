const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//Connecting to mongoDB
const dbUrl = "mongodb+srv://admin:kmi7CDCACMybyduX@cluster0.h7crlbc.mongodb.net";
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

  app.post("/item", function (req, res) {
    const body = req.body;
    const item = body.name;
    lista.push(item);

    res.send("Item adicionado com sucesso!");
  });

  app.listen(3000);
}

main();
