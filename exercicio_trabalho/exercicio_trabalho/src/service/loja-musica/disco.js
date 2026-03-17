const db = require('../../../database/connection')

const criar = ({ nome, data_lancamento, gravadora_id }) => {
    console.log('>>> lojaMusica:disco:criar > ', { nome, data_lancamento, gravadora_id })
    db.run(`INSERT INTO disco (nome, data_lancamento, gravadora_id) VALUES (?, ?, ?);`, [nome, data_lancamento, gravadora_id])
}

const listar = () => new Promise((resolve, reject) => {
    console.log('>>> lojaMusica:disco:listar > ')
    db.all(`SELECT d.*, g.nome as gravadora_nome 
            FROM disco d
            LEFT JOIN gravadora g ON g.gravadora_id = d.gravadora_id`,
        (erro, resposta) => resolve(resposta))
})

const excluir = (id) => {
    console.log('>>> lojaMusica:disco:excluir > ', id)
    db.run(`DELETE FROM disco WHERE disco_id = (?);`, [id])
}

const editar = ({ id, nome, data_lancamento, gravadora_id }) => {
    console.log('>>> lojaMusica:disco:editar > ', { id, nome, data_lancamento, gravadora_id })
    db.run(`UPDATE disco SET nome = ?, data_lancamento = ?, gravadora_id = ? WHERE disco_id = ?;`, [nome, data_lancamento, gravadora_id, id])
}

module.exports = { criar, listar, excluir, editar }