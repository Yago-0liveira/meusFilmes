const db = require("../db");

const ControleFilmes = {
  async findAll(req, res) {
    try {
      const filmes = await db.query(`
      SELECT 
        f.*,
        c.nome AS categoria_nome,
        c.descricao AS categoria_descricao
      FROM filmes f 
      INNER JOIN categoria c ON c.id = f.id_categoria
    `);

      res.json(filmes.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async find(req, res) {
    const { id } = req.params;

    try {
      const filmes = await db.query(
        `
        SELECT 
          f.*,
          c.nome AS categoria_nome,
          c.descricao AS categoria_descricao
        FROM filmes f 
        INNER JOIN categoria c ON c.id = f.id_categoria
        WHERE f.id = $1
      `,
        [id]
      );

      if (filmes.rows.length > 0) {
        res.json(filmes.rows[0]);
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async create(req, res) {
    const { titulo, descricao, id_categoria, assistido_em } = req.body;

    // É necessário realizar uma validação pelo id de categoria

    try {
      const novoFilme = await db.query(
        `INSERT INTO filmes (titulo, descricao, id_categoria, assistido_em)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [titulo, descricao, id_categoria, assistido_em]
      );

      res.status(201).json(novoFilme.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      const resultado = await db.query(
        "DELETE FROM filmes WHERE id = $1 RETURNING *",
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
  async update(req, res) {},
};
module.exports = ControleFilmes;
