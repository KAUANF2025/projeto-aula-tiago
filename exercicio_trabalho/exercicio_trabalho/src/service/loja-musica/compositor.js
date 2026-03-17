const db = require('../../../database/connection')

const criar = ({ musica_id, artista_id }) => {
    console.log('>>> lojaMusica:compositor:criar > ', { musica_id, artista_id })
    db.run(`INSERT INTO compositor (musica_id, artista_id) VALUES (?, ?);`, [musica_id, artista_id])
}

const listar = () => {
    console.log('>>> lojaMusica:compositor:listar > ')
    return new Promise((resolve, reject) => {
        db.all(`SELECT c.musica_id, c.artista_id, m.nome as musica_nome, a.nome as artista_nome
                FROM compositor c
                LEFT JOIN musica m ON m.musica_id = c.musica_id
                LEFT JOIN artista a ON a.artista_id = c.artista_id`,
            (erro, resposta) => erro ? reject(erro) : resolve(resposta))
    })
}

const excluir = ({ musica_id, artista_id }) => {
    console.log('>>> lojaMusica:compositor:excluir > ', { musica_id, artista_id })
    db.run(`DELETE FROM compositor WHERE musica_id = (?) AND artista_id = (?);`, [musica_id, artista_id])
}

module.exports = { criar, listar, excluir }