var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.post("/salvar", function (req, res) {
    resultadoController.salvar(req, res);
});

router.get("/ultimoturno/:idUsuario", function (req, res) {
    resultadoController.buscar(req, res);
});

router.get("/vitorias", function (req, res) {
    resultadoController.vitorias(req, res);
});

module.exports = router;