const formMusicaDisco = document.getElementById('form-musica-disco')

if (formMusicaDisco) {
    carregarDiscos()
    carregarMusicas()
    carregarMusicaDisco()

    formMusicaDisco.addEventListener('submit', async (event) => {
        event.preventDefault()

        const disco_id = document.getElementById('disco_id').value
        const musica_id = document.getElementById('musica_id').value

        await window.lojaMusica.musicaDisco.criar({ musica_id, disco_id })
        await carregarMusicaDisco()
        formMusicaDisco.reset()
    })
}

async function carregarDiscos() {
    const discos = await window.lojaMusica.disco.listar()
    document.getElementById('disco_id').innerHTML =
        '<option value="">Selecione</option>' +
        discos.map(d => `<option value="${d.disco_id}">${d.nome}</option>`).join('')
}

async function carregarMusicas() {
    const musicas = await window.lojaMusica.musica.listar()
    document.getElementById('musica_id').innerHTML =
        '<option value="">Selecione</option>' +
        musicas.map(m => `<option value="${m.musica_id}">${m.nome}</option>`).join('')
}

async function carregarMusicaDisco() {
    const lista = document.getElementById('lista-musica-disco')
    const associacoes = await window.lojaMusica.musicaDisco.listar()

    lista.innerHTML = associacoes.map(a => `
        <p>
            <strong>Disco:</strong> ${a.disco_nome} | <strong>Música:</strong> ${a.musica_nome}
            <button onclick="excluirAssociacao(${a.musica_id}, ${a.disco_id})">Excluir</button>
        </p>
        <hr>
    `).join('')
}

window.excluirAssociacao = async (musica_id, disco_id) => {
    if (!confirm('Tem certeza?')) return
    await window.lojaMusica.musicaDisco.excluir({ musica_id, disco_id })
    await carregarMusicaDisco()
}