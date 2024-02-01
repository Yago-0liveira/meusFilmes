const express = require("express");
const bodyParser = require("body-parser");
const filmesRotas = require("./src/rotas/categoria");
const categoriaRotas = require("./src/rotas/categoria");

 const app = express();

 app.use(bodyParser.json());
 const PORT = process.env.PORT || 3000; 

 app.use("/filmes", filmesRotas);
 app.use("/categoria", categoriaRotas); 


 app.listen(PORT, () => {
    console.log('server running on http/localhost:${PORT}');

 })