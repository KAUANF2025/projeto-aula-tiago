const formEstilo = document.getElementById('form-estilo')
if (formEstilo) {
    formEstilo.addEventListener('submit', async (event) => {
        event.preventDefault()
        const inputDescricao = formEstilo.querySelector('[name="descricao"]')
        await window.lojaMusica.estilo.criar(inputDescricao.value)
        await window.lojaMusica.estilo.listar()
    })
}

const formArtista = document.getElementById('form-artista')
if (formArtista) {
    formArtista.addEventListener('submit', async (event) => {
        event.preventDefault()
        const inputNome = formArtista.querySelector('[name="nome"]')
        await window.lojaMusica.artista.criar(inputNome.value)
        await window.lojaMusica.artista.listar()
    })
}

const formGravadora = document.getElementById('form-gravadora')
if (formGravadora) {
    formGravadora.addEventListener('submit', async (event) => {
        event.preventDefault()
        const inputNome = formGravadora.querySelector('[name="nome"]')
        await window.lojaMusica.gravadora.criar(inputNome.value)
        await window.lojaMusica.gravadora.listar()
    })
}