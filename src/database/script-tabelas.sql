-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE katyperry;
USE katyperry;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(25) NOT NULL
);

SELECT * FROM usuario;

CREATE TABLE torneio (
    idTorneio INT PRIMARY KEY AUTO_INCREMENT,
    musicas VARCHAR(100),
    CONSTRAINT chkMusicas CHECK (musicas IN ('California Gurls' , 'Teenage Dream',
        'Firework',
        'E.T.',
        'Last Friday Night (T.G.I.F.)',
        'The One That Got Away',
        'Part of Me',
        'Wide Awake'))
);

INSERT INTO torneio (musicas) VALUES 
('Teenage Dream');

CREATE TABLE resultado (
    idResultado INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkTorneio INT,
    quartas VARCHAR(255),
    semifinal VARCHAR(255),
    final VARCHAR(255),
    campea VARCHAR(100),
    CONSTRAINT fkResultadoxUsuario FOREIGN KEY (fkUsuario)
        REFERENCES usuario (idUsuario),
    CONSTRAINT fkResultadoxTorneio FOREIGN KEY (fkTorneio)
        REFERENCES torneio (idTorneio),
    CONSTRAINT chkCampea CHECK (campea IN ('California Gurls' , 'Teenage Dream',
        'Firework',
        'E.T.',
        'Last Friday Night (T.G.I.F.)',
        'The One That Got Away',
        'Part of Me',
        'Wide Awake'))
);

DROP TABLE resultado;

INSERT INTO torneio (musicas) VALUES 
('Teenage Dream');