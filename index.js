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

app.listen(3000)
