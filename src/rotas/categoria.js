const express = require("express");
const router = express.Router();
const ControleCategoria = require("../controles/ControleCategoria.js");

router.get("/", ControleCategoria.findAll);
router.get("/:id", ControleCategoria.find);
router.post("/", ControleCategoria.create);
router.delete("/:id", ControleCategoria.delete);
router.put("/:id", ControleCategoria.update);
module.exports = router;
