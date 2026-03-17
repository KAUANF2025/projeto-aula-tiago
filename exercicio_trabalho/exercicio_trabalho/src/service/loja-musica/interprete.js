const db = require('../../../database/connection')

const criar = ({ musica_id, artista_id }) => 
    db.run(`INSERT INTO interprete (musica_id, artista_id) VALUES (?, ?);`, [musica_id, artista_id]) &&
    console.log('>>> lojaMusica:interprete:criar > ', { musica_id, artista_id })

const listar = () => new Promise(res =>
    db.all(`
        SELECT i.musica_id, i.artista_id,
               m.nome as musica_nome,
               a.nome as artista_nome
        FROM interprete i
        LEFT JOIN musica m ON m.musica_id = i.musica_id
        LEFT JOIN artista a ON a.artista_id = i.artista_id
    `, (erro, resposta) => (console.log('>>> lojaMusica:interprete:listar > '), res(resposta)))
)

const excluir = ({ musica_id, artista_id }) =>
    db.run(`DELETE FROM interprete WHERE musica_id = (?) AND artista_id = (?);`, [musica_id, artista_id]) &&
    console.log('>>> lojaMusica:interprete:excluir > ', { musica_id, artista_id })

module.exports = { criar, listar, excluir }