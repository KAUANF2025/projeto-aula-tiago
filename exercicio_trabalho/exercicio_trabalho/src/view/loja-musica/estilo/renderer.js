const formEstilo = document.getElementById('form-estilo')
if (formEstilo) {
    carregarEstilos()
    formEstilo.addEventListener('submit', async (event) => {
        event.preventDefault()
        const descricao = document.getElementById('descricao').value
        await window.lojaMusica.estilo.criar(descricao)
        await carregarEstilos()

        formEstilo.reset()
    })
}
async function carregarEstilos() {
    const lista = document.getElementById('lista-estilos')
    const estilos = await window.lojaMusica.estilo.listar()
    lista.innerHTML = estilos.map(e => `
        <p>
            ${e.descricao}
            <button onclick="excluirEstilo(${e.estilo_id})">Excluir</button>
        </p>
        <hr>
    `).join('')

}
window.excluirEstilo = async (id) => {

    if (confirm('Tem certeza?')) {

        await window.lojaMusica.estilo.excluir(id)

        await carregarEstilos()

    }
}
window.editarEstilo = async (id) => {
    const descricao = prompt('Nova descrição do estilo:')
    if (descricao) {

        await window.lojaMusica.estilo.editar({ id, descricao })

        await carregarEstilos()

    }
}