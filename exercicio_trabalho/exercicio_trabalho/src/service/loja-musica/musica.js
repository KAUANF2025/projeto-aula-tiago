const db = require('../../../database/connection');

const criar = ({ nome, duracao, data_lancamento, estilo_id, compositor_id, interpretes = [], disco_id = null }) => {
    console.log('>>> lojaMusica:musica:criar > ', { nome, duracao, data_lancamento, estilo_id, compositor_id, interpretes, disco_id });

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION;');
            db.run(`INSERT INTO musica (nome, duracao, data_lancamento, estilo_id) VALUES (?, ?, ?, ?);`,
                [nome, duracao, data_lancamento, estilo_id], function(err) {
                    if (err) { db.run('ROLLBACK;'); return reject(err); }
                    const musica_id = this.lastID;

                    db.run(`INSERT INTO compositor (musica_id, artista_id) VALUES (?, ?);`, [musica_id, compositor_id]);
                    interpretes.forEach(artista_id => db.run(`INSERT INTO interprete (musica_id, artista_id) VALUES (?, ?);`, [musica_id, artista_id]));
                    if (disco_id) db.run(`INSERT INTO musica_disco (musica_id, disco_id) VALUES (?, ?);`, [musica_id, disco_id]);

                    db.run('COMMIT;', err => err ? reject(err) : resolve({ id: musica_id }));
                });
        });
    });
};

const listar = () => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:musica:listar >');
    db.all(`
        SELECT 
            m.*,
            e.descricao as estilo_nome,
            (SELECT a.nome FROM compositor c LEFT JOIN artista a ON a.artista_id = c.artista_id WHERE c.musica_id = m.musica_id LIMIT 1) as compositor_nome,
            (SELECT GROUP_CONCAT(a.nome, ', ') FROM interprete i LEFT JOIN artista a ON a.artista_id = i.artista_id WHERE i.musica_id = m.musica_id) as interpretes,
            (SELECT d.nome FROM musica_disco md LEFT JOIN disco d ON d.disco_id = md.disco_id WHERE md.musica_id = m.musica_id LIMIT 1) as disco_nome,
            (SELECT g.nome FROM musica_disco md LEFT JOIN disco d ON d.disco_id = md.disco_id LEFT JOIN gravadora g ON g.gravadora_id = d.gravadora_id WHERE md.musica_id = m.musica_id LIMIT 1) as gravadora_nome
        FROM musica m
        LEFT JOIN estilo e ON e.estilo_id = m.estilo_id
        ORDER BY m.musica_id DESC
    `, (erro, musicas) => {
        if (erro) return reject(erro);
        musicas.forEach(m => {
            m.interpretes = m.interpretes || 'Nenhum intérprete';
            m.compositor_nome = m.compositor_nome || 'Nenhum compositor';
            m.disco_nome = m.disco_nome || 'Nenhum disco';
            m.gravadora_nome = m.gravadora_nome || 'Nenhuma gravadora';
        });
        resolve(musicas);
    });
});

const listarParaSelect = () => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:musica:listarParaSelect >');
    db.all(`SELECT musica_id, nome FROM musica ORDER BY nome;`, (erro, resposta) => erro ? reject(erro) : resolve(resposta));
});

const excluir = (id) => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:musica:excluir > ', id);
    db.serialize(() => {
        db.run('BEGIN TRANSACTION;');
        ['compositor', 'interprete', 'musica_disco'].forEach(tabela =>
            db.run(`DELETE FROM ${tabela} WHERE musica_id = ?;`, [id])
        );
        db.run(`DELETE FROM musica WHERE musica_id = ?;`, [id], err => {
            if (err) { db.run('ROLLBACK;'); return reject(err); }
            db.run('COMMIT;', err => err ? reject(err) : resolve());
        });
    });
});

const editar = ({ id, nome, duracao, data_lancamento, estilo_id, compositor_id, interpretes = [], disco_id = null }) => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:musica:editar > ', { id, nome, duracao, data_lancamento, estilo_id, compositor_id, interpretes, disco_id });
    db.serialize(() => {
        db.run('BEGIN TRANSACTION;');
        db.run(`UPDATE musica SET nome = ?, duracao = ?, data_lancamento = ?, estilo_id = ? WHERE musica_id = ?;`, [nome, duracao, data_lancamento, estilo_id, id]);
        db.run(`DELETE FROM compositor WHERE musica_id = ?;`, [id]);
        db.run(`INSERT INTO compositor (musica_id, artista_id) VALUES (?, ?);`, [id, compositor_id]);
        db.run(`DELETE FROM interprete WHERE musica_id = ?;`, [id]);
        interpretes.forEach(a => db.run(`INSERT INTO interprete (musica_id, artista_id) VALUES (?, ?);`, [id, a]));
        db.run(`DELETE FROM musica_disco WHERE musica_id = ?;`, [id]);
        if (disco_id) db.run(`INSERT INTO musica_disco (musica_id, disco_id) VALUES (?, ?);`, [id, disco_id]);
        db.run('COMMIT;', err => err ? reject(err) : resolve());
    });
});

const buscarPorId = (id) => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:musica:buscarPorId > ', id);
    db.get(`SELECT * FROM musica WHERE musica_id = ?;`, [id], (erro, musica) => {
        if (erro) return reject(erro);
        if (!musica) return resolve(null);
        db.get(`SELECT artista_id FROM compositor WHERE musica_id = ?`, [id], (err, c) => {
            if (err) return reject(err);
            musica.compositor_id = c ? c.artista_id : null;
            db.all(`SELECT artista_id FROM interprete WHERE musica_id = ?`, [id], (err, i) => {
                if (err) return reject(err);
                musica.interpretes = i.map(x => x.artista_id);
                db.get(`SELECT disco_id FROM musica_disco WHERE musica_id = ?`, [id], (err, d) => {
                    if (err) return reject(err);
                    musica.disco_id = d ? d.disco_id : null;
                    resolve(musica);
                });
            });
        });
    });
});

module.exports = { criar, listar, listarParaSelect, excluir, editar, buscarPorId };