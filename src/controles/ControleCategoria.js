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
      const validaId = await db.query(`SELECT * FROM categoria WHERE id = $1`, [
        id,
      ]);
      if (validaId.rows.length === 0) {
        return res.status(404).json({ error: "Categoria nao encontrada" });
      }
      const resultado = await db.query(
        "DELETE FROM categoria WHERE id = $1 RETURNING *",
        [id]
      );

      if (resultado.rowCount > 0) {
        res.status(204).json({});
      } else {
        res.status(304).json({});
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const validaId = await db.query(`SELECT * FROM categoria WHERE id = $1`, [
        id,
      ]);
      if (validaId.rows.length === 0) {
        return res.status(404).json({ error: "Categoria nao encontrada" });
      }

      const updateCategoria = await db.query(
        ` UPDATE categoria 
            SET  nome = $1, descricao = $2
            WHERE id = $3
            RETURNING *; `,

        [nome, descricao, id]
      );

      if (updateCategoria.rowCount > 0) {
        res.status(200).json(updateCategoria.rows[0]);
      } else {
        res.status(304).json({ error: "atualização nao encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = ControleCategoria;
