var database = require("../database/config");

function cadastrar(empresaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  cadastrar
}
