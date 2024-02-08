const db = require("../db");
const ControleCategoria = {
  async findAll(req, res) {
    try {
      const categoria = await db.query("SELECT * from categoria");
      res.json(categoria.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  find(req, res) {
    const { id } = req.params;
    res.json([
      {
        id: id,
        nome: "filmes A",
        descricao: "categoria dos filmes que comecam com A",
      },
    ]);
  },
  create(req, res) {
    const { nome, descricao } = req.body;
    res.status(201).json({
      id: Number.MAX_SAFE_INTEGER,
      nome: nome,
      descricao: descricao,
    });
  },
  delete(req, res) {
    const { id } = req.params;
    res.status(204).json();
  },
};
module.exports = ControleCategoria;
