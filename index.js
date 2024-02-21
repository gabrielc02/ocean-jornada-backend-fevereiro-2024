const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Ola Mundo')
})

const lista =['Rick Sanchez', 'Morty Smith', 'Summer Smith']

//Read all -> [GET] /item
app.get('/item', function (req, res) {
  res.send(lista)
})

//Read by ID
app.get('/item/:id', function (req, res){
  const id = req.params.id
  const item = lista[id]

  res.send(item)
})

//Corpo da requisicao em jason
app.use(express.json())

app.post('/item', function (req, res){
  const body = req.body
  const item = body.name
  lista.push(item)

  res.send("Item adicionado com sucesso!")
})


app.listen(3000)
