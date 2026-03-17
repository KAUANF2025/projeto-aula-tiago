const db = require('../../../database/connection');

const criar = ({ musica_id, disco_id }) => {
    console.log('>>> lojaMusica:musicaDisco:criar > ', { musica_id, disco_id });
    db.run(`INSERT INTO musica_disco (musica_id, disco_id) VALUES (?, ?)`, [musica_id, disco_id]);
};

const listar = () => new Promise(resolve => {
    console.log('>>> lojaMusica:musicaDisco:listar >');
    db.all(`
        SELECT 
            md.musica_id,
            md.disco_id,
            m.nome as musica_nome,
            d.nome as disco_nome
        FROM musica_disco md
        LEFT JOIN musica m ON m.musica_id = md.musica_id
        LEFT JOIN disco d ON d.disco_id = md.disco_id
    `, (_, resposta) => resolve(resposta));
});

const excluir = ({ musica_id, disco_id }) => {
    console.log('>>> lojaMusica:musicaDisco:excluir > ', { musica_id, disco_id });
    db.run(`DELETE FROM musica_disco WHERE musica_id = ? AND disco_id = ?`, [musica_id, disco_id]);
};

module.exports = { criar, listar, excluir };