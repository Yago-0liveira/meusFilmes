const db = require("../db");
const ControleCategoria = {
  async findAll(req, res) {
    try {
      const categoria = await db.query("SELECT * FROM categoria");
      res.json(categoria.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async find(req, res) {
    const { id } = req.params;
    try {
      const categoria = await db.query(
        "SELECT * FROM categoria WHERE id = $1",
        [id]
      );

      if (categoria.rows.length > 0) {
        res.json(categoria.rows[0]);
      } else {
        res.status(404).json({ error: "Categoria não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async create(req, res) {
    const { nome, descricao } = req.body;

    try {
      const novaCategoria = await db.query(
        "INSERT INTO categoria (nome, descricao) VALUES ($1, $2) RETURNING *",
        [nome, descricao]
      );

      res.status(201).json(novaCategoria.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      const resultado = await db.query(
        "DELETE FROM categoria WHERE id = $1 RETURNING *",
        [id]
      );

      if (resultado.rowCount > 0) {
        res.status(204).json({});
      }

      res.status(304).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {},
};
module.exports = ControleCategoria;
