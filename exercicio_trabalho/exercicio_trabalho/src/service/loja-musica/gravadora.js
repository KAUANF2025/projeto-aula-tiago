const db = require('../../../database/connection')

const criar = nome => (console.log('>>> lojaMusica:gravadora:criar > ', nome), db.run(`INSERT INTO gravadora (nome) VALUES (?);`, [nome]))

const listar = () => new Promise(resolve => (console.log('>>> lojaMusica:gravadora:listar > '), db.all(`SELECT * FROM gravadora;`, (err, res) => resolve(res))))

const excluir = id => (console.log('>>> lojaMusica:gravadora:excluir > ', id), db.run(`DELETE FROM gravadora WHERE gravadora_id = (?);`, [id]))

const editar = ({ id, nome }) => (console.log('>>> lojaMusica:gravadora:editar > ', id, nome), db.run(`UPDATE gravadora SET nome = (?) WHERE gravadora_id = (?);`, [nome, id]))

module.exports = { criar, listar, excluir, editar }