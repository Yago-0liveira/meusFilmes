const ControleCategoria = {
  findAll(req, res) {
    res.json([
      {
        id: 1,
        nome: "filmes A",
        descricao: "categoria dos filmes que comecam com A",
      },
      {
        id: 2,
        nome: "filmes B",
        descricao: "categoria dos filmes que comecam com B",
      },
    ]);
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
