const express = require("express");
const bodyParser = require("body-parser");
const filmesRotas = require("./src/rotas/categoria");
const categoriaRotas = require("./src/rotas/categoria");

 const app = express();

 app.use(bodyParser.json());

 app.use("/filmes", filmesRotas);
 app.use("/categoria", categoriaRotas); 


 app.listen(300, () => {
    console.log('server running on http/localhost:300');

 })