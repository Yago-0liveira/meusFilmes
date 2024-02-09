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
    const validaCategoria = await db.query(
      `SELECT * FROM categoria WHERE id = $1`,
      [id_categoria]
    );
    if (validaCategoria.rows.length === 0) {
      return res.status(400).json({ error: "Categoria nao encontrada" });
    }
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
      const validaId = await db.query(`SELECT * FROM filmes WHERE id = $1`, [
        id,
      ]);
      if (validaId.rows.length === 0) {
        return res.status(404).json({ error: "Filme nao encontrado" });
      }
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
  async update(req, res) {
    const { id } = req.params;
    const { titulo, descricao, id_categoria, assistido_em } = req.body;

    try {
      const validaCategoria = await db.query(
        `SELECT * FROM categoria WHERE id = $1`,
        [id_categoria]
      );
      if (validaCategoria.rows.length === 0) {
        return res.status(404).json({ error: "Categoria nao encontrada" });
      }

      const updateFilmes = await db.query(
        `UPDATE filmes 
            SET titulo = $1, descricao = $2, id_categoria = $3, assistido_em = $4 
            WHERE id = $5
            RETURNING *;`,
        [titulo, descricao, id_categoria, assistido_em, id]
      );

      if (updateFilmes.rowCount > 0) {
        res.status(200).json(updateFilmes.rows[0]);
      } else {
        res.status(304).json({ error: "atualização nao encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = ControleFilmes;
