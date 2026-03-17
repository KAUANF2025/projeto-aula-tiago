const formInterprete = document.getElementById('form-interprete')

if (formInterprete) {

carregarMusicas()
carregarArtistas()
carregarInterpretes()

formInterprete.addEventListener('submit', async (event) => {
event.preventDefault()

const musica_id = document.getElementById('musica_id').value
const artista_id = document.getElementById('artista_id').value

await window.lojaMusica.interprete.criar({ musica_id, artista_id })
await carregarInterpretes()
formInterprete.reset()

})

}

async function carregarMusicas() {

const select = document.getElementById('musica_id')
const musicas = await window.lojaMusica.musica.listar()

select.innerHTML =
'<option value="">Selecione</option>' +
musicas
.map(m => `<option value="${m.musica_id}">${m.nome}</option>`)
.join('')

}

async function carregarArtistas() {

const select = document.getElementById('artista_id')
const artistas = await window.lojaMusica.artista.listar()

select.innerHTML =
'<option value="">Selecione</option>' +
artistas
.map(a => `<option value="${a.artista_id}">${a.nome}</option>`)
.join('')

}

async function carregarInterpretes() {

const lista = document.getElementById('lista-interpretes')
const interpretes = await window.lojaMusica.interprete.listar()

lista.innerHTML =
interpretes
.map(i => `
<p>
${i.musica_nome} - ${i.artista_nome}
<button onclick="excluirInterprete(${i.musica_id}, ${i.artista_id})">Excluir</button>
</p>
<hr>
`)
.join('')

}

window.excluirInterprete = async (musica_id, artista_id) => {

if (confirm('Tem certeza?')) {

await window.lojaMusica.interprete.excluir({ musica_id, artista_id })
await carregarInterpretes()

}

}