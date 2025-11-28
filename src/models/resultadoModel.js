var database = require("../database/config");

function salvar(fkUsuario, fkTorneio, semis, final, campea) {
    var sql = `
        INSERT INTO resultado (fkUsuario, fkTorneio, quartas, semifinal, final, campea)
        VALUES (${fkUsuario}, ${fkTorneio}, '', '${semis}', '${final}', '${campea}');
    `;
    return database.executar(sql);
}

function buscar(idUsuario) {
    var sql = `
        SELECT semifinal, final, campea
        FROM resultado
        WHERE fkUsuario = ${idUsuario}
        ORDER BY fkTorneio DESC
        LIMIT 1;
    `;
    return database.executar(sql);
}

function vitorias() {
    var sql = `
        SELECT campea, COUNT(*) AS vitorias
        FROM resultado
        GROUP BY campea;
    `;
    return database.executar(sql);
}

module.exports = {
    salvar,
    buscar,
    vitorias
}