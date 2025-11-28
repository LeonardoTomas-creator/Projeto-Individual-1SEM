var resultadoModel = require("../models/resultadoModel");

function salvar(req, res) {
  var fkUsuario = req.body.fkUsuario;
  var fkTorneio = req.body.fkTorneio;
  var semis = req.body.semifinal;
  var final = req.body.final;
  var campea = req.body.campea;

  if (!fkUsuario || !fkTorneio) {
    return res.status(400).send("Usuário ou torneio indefinido!");
  }

  resultadoModel
    .salvar(fkUsuario, fkTorneio, semis, final, campea)
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscar(req, res) {
  var idUsuario = req.params.idUsuario;

  resultadoModel
    .buscar(idUsuario)
    .then((resultado) => res.json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function vitorias(req, res) {
  resultadoModel
    .vitorias()
    .then((resultado) => res.json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

module.exports = {
  salvar,
  buscar,
  vitorias,
};
