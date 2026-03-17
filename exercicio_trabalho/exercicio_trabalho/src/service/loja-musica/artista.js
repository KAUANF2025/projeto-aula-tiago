const db = require('../../../database/connection')

const criar = (nome) => {
    console.log('>>> lojaMusica:artista:criar > ', nome)
    db.run(`INSERT INTO artista (nome) VALUES (?);`, [nome])
}

const listar = () => {
    console.log('>>> lojaMusica:artista:listar > ')
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM artista;`, (erro, resposta) => resolve(resposta))
    })
}

const excluir = (id) => {
    console.log('>>> lojaMusica:artista:excluir > ', id)
    db.run(`DELETE FROM artista WHERE artista_id = (?);`, [id])
}

const editar = ({ id, nome }) => {
    console.log('>>> lojaMusica:artista:editar > ', id, nome)
    db.run(`UPDATE artista SET nome = (?) WHERE artista_id = (?);`, [nome, id])
}

module.exports = { criar, listar, excluir, editar }