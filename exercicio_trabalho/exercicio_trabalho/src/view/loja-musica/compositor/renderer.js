const formCompositor = document.getElementById('form-compositor')

if (formCompositor) {

    carregarMusicas()
    carregarArtistas()
    carregarCompositores()

    formCompositor.addEventListener('submit', async (event) => {

        event.preventDefault()

        const musica_id = document.getElementById('musica_id').value
        const artista_id = document.getElementById('artista_id').value

        await window.lojaMusica.compositor.criar({ musica_id, artista_id })

        await carregarCompositores()

    })

}

async function carregarMusicas() {

    const select = document.getElementById('musica_id')

    const musicas = await window.lojaMusica.musica.listar()

    select.innerHTML =
        '<option>Selecione</option>' +
        musicas
            .map(m => `<option value="${m.musica_id}">${m.nome}</option>`)
            .join('')

}

async function carregarArtistas() {

    const select = document.getElementById('artista_id')

    const artistas = await window.lojaMusica.artista.listar()

    select.innerHTML =
        '<option>Selecione</option>' +
        artistas
            .map(a => `<option value="${a.artista_id}">${a.nome}</option>`)
            .join('')

}

async function carregarCompositores() {

    const lista = document.getElementById('lista-compositores')

    const compositores = await window.lojaMusica.compositor.listar()

    lista.innerHTML = compositores
        .map(c => `
        <p>
            ${c.musica_nome} - ${c.artista_nome}
            <button onclick="excluirCompositor(${c.musica_id}, ${c.artista_id})">
                Excluir
            </button>
        </p>
        <hr>
    `)
        .join('')

}

window.excluirCompositor = async (musica_id, artista_id) => {

    await window.lojaMusica.compositor.excluir({ musica_id, artista_id })

    await carregarCompositores()

}