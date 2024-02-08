const ControleFilmes = {
  findAll(req, res) {
    res.json([
      {
        id: 1,
        titulo: "batman",
        descricao: "cara do morcego que bate em bandido",
        id_Categoria: 1,
        assistido_em: "22/01/2024",
      },
      {
        id: 2,
        titulo: "Harry Potter",
        descricao: "vai sentando na vassoura",
        id_Categoria: 2,
        assistido_em: "01/01/2024",
      },
    ]);
  },
  find(req, res) {
    const { id } = req.params;
    res.json([
      {
        id: id,
        titulo: "batman",
        descricao: "cara do morcego que bate em bandido",
        id_Categoria: 1,
        assistido_em: "22/01/2024",
      },
    ]);
  },
  create(req, res) {
    const { titulo, descricao, id_Categoria, assistido_em } = req.body;
    res.status(201).json({
      id: Number.MAX_SAFE_INTEGER,
      titulo,
      descricao,
      id_Categoria,
      assistido_em,
    });
  },
  delete(req, res) {
    const { id } = req.params;
    res.status(204).json();
  },
};
module.exports = ControleFilmes;
