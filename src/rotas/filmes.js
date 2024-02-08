const express = require("express");
const router = express.Router();
const ControleFilmes = require("../controles/ControleFilmes.js");

router.get("/", ControleFilmes.findAll);
router.get("/:id", ControleFilmes.find);
router.post("/", ControleFilmes.create);
router.delete("/:id", ControleFilmes.delete);

module.exports = router;
