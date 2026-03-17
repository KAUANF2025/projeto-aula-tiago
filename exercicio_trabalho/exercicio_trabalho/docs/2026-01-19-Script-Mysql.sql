CREATE DATABASE loja_musica_db;
USE loja_musica_db;

-- DDL
CREATE TABLE artista (
	artista_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE estilo (
	estilo_id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE gravadora (
	gravadora_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE musica (
	musica_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    duracao VARCHAR(255) NOT NULL,
    data_lancamento DATE NOT NULL,
    estilo_id INT NOT NULL,
    
    -- regra de chave estrangeira
    FOREIGN KEY (estilo_id) REFERENCES estilo (estilo_id)
);

CREATE TABLE disco (
	disco_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_lancamento DATE NOT NULL,
    imagem TEXT,
    gravadora_id INT,
    
    -- regra de chave estrangeira
    FOREIGN KEY (gravadora_id) REFERENCES gravadora (gravadora_id)
);

CREATE TABLE musica_disco (
	musica_id INT NOT NULL,
    disco_id INT NOT NULL,
    
    -- regra de chave estrangeira
    FOREIGN KEY (musica_id) REFERENCES musica (musica_id),
    FOREIGN KEY (disco_id) REFERENCES disco (disco_id),
    
    -- regra de chave primaria composta
    PRIMARY KEY (musica_id, disco_id)
);

CREATE TABLE compositor (
	musica_id INT NOT NULL,
    artista_id INT NOT NULL,
    
    -- regra de chave estrangeira
    FOREIGN KEY (musica_id) REFERENCES musica (musica_id),
    FOREIGN KEY (artista_id) REFERENCES artista (artista_id),
    
    -- regra de chave primaria composta
    PRIMARY KEY (musica_id, artista_id)
);

CREATE TABLE interprete (
	musica_id INT NOT NULL,
    artista_id INT NOT NULL,
    
    -- regra de chave estrangeira
    FOREIGN KEY (musica_id) REFERENCES musica (musica_id),
    FOREIGN KEY (artista_id) REFERENCES artista (artista_id),
    
    -- regra de chave primaria composta
    PRIMARY KEY (musica_id, artista_id)
);

-- DML
INSERT INTO artista (nome) VALUES
('Ney Mato Grosso'),
('Chico Buarque'),
('Linkin Park');

INSERT INTO estilo (descricao) VALUES
('MPB'),
('Rock'),
('Eletrônica');

INSERT INTO musica (nome, duracao, data_lancamento, estilo_id) VALUES
('Cálice', '2:00', '2000-10-16', (SELECT estilo_id FROM estilo WHERE descricao = 'MPB'));
INSERT INTO musica (nome, duracao, data_lancamento, estilo_id) VALUES
('Feijoada Completa', '2:50', '1978-08-08', (SELECT estilo_id FROM estilo WHERE descricao = 'MPB'));
INSERT INTO musica (nome, duracao, data_lancamento, estilo_id) VALUES
('Faint', '2:50', '2003-03-25', (SELECT estilo_id FROM estilo WHERE descricao = 'Rock'));


INSERT INTO disco (nome, data_lancamento) VALUES ('Chico Buarque', '1978-08-08');
INSERT INTO disco (nome, data_lancamento) VALUES ('Meteora', '2003-03-25');

INSERT INTO musica_disco (musica_id, disco_id) VALUES (
	(SELECT musica_id FROM musica WHERE nome = 'Cálice'),
    (SELECT disco_id FROM disco WHERE nome = 'Chico Buarque')
);
INSERT INTO musica_disco (musica_id, disco_id) VALUES (
	(SELECT musica_id FROM musica WHERE nome = 'Feijoada Completa'),
    (SELECT disco_id FROM disco WHERE nome = 'Chico Buarque')
);
INSERT INTO musica_disco (musica_id, disco_id) VALUES (
	(SELECT musica_id FROM musica WHERE nome = 'Faint'),
    (SELECT disco_id FROM disco WHERE nome = 'Meteora')
);

SELECT m.musica_id, m.nome, m.duracao FROM musica_disco md
INNER JOIN musica m ON m.musica_id = md.musica_id
INNER JOIN disco d ON d.disco_id = md.disco_id
WHERE d.disco_id = 1
ORDER BY m.nome ASC -- ASC / DESC
LIMIT 10 -- Qtd itens por pagina
OFFSET 0 -- Qtd itens por pagina * (pagina atual - 1)
;
-- %batata%
SELECT m.musica_id, m.nome, m.duracao FROM musica m
WHERE m.nome LIKE '%a%'
ORDER BY m.nome ASC -- ASC / DESC
LIMIT 10 -- Qtd itens por pagina
OFFSET 0 -- Qtd itens por pagina * (pagina atual - 1)
;

CREATE OR REPLACE VIEW VI_ARTISTA_DISCO_MUSICA AS
	SELECT m.musica_id AS musica_id,
		m.nome AS musica_nome,
        m.duracao AS musica_duracao,
        m.data_lancamento AS musica_data_lancamento,
        d.nome AS disco_nome,
        a.nome AS artista_nome
	FROM musica_disco md
	INNER JOIN musica m ON m.musica_id = md.musica_id
	INNER JOIN disco d ON d.disco_id = md.disco_id
	INNER JOIN compositor c ON c.musica_id = m.musica_id
	INNER JOIN interprete i ON i.musica_id = m.musica_id
	INNER JOIN artista a ON a.artista_id = i.artista_id;
    
SELECT * FROM VI_ARTISTA_DISCO_MUSICA;


delete from musica where musica_id=2;

select * from musica;
select * from musica_disco;
select * from disco;