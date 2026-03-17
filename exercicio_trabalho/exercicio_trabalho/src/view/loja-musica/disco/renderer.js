const formDisco = document.getElementById('form-disco')

if (formDisco) {

    carregarGravadoras()
    carregarDiscos()

    formDisco.addEventListener('submit', async (event) => {

        event.preventDefault()

        const nome = document.getElementById('nome').value
        const data_lancamento = document.getElementById('data_lancamento').value
        const gravadora_id = document.getElementById('gravadora_id').value

        await window.lojaMusica.disco.criar({
            nome,
            data_lancamento,
            gravadora_id: gravadora_id || null
        })

        await carregarDiscos()

        formDisco.reset()

    })

}
async function carregarGravadoras() {

    const select = document.getElementById('gravadora_id')

    const gravadoras = await window.lojaMusica.gravadora.listar()

    select.innerHTML =
        '<option value="">Selecione</option>' +
        gravadoras
            .map(g => `<option value="${g.gravadora_id}">${g.nome}</option>`)
            .join('')

}
async function carregarDiscos() {

    const lista = document.getElementById('lista-discos')
    const discos = await window.lojaMusica.disco.listar()
    lista.innerHTML =
        discos.map(d => `
        <p>
            <strong>${d.nome}</strong> - ${d.data_lancamento} - Gravadora: ${d.gravadora_nome || 'Nenhuma'}
            <button onclick="editarDisco(${d.disco_id})">Editar</button>
            <button onclick="excluirDisco(${d.disco_id})">Excluir</button>
        </p>
        <hr>
    `).join('')

}
window.excluirDisco = async (id) => {

    if (confirm('Tem certeza?')) {

        await window.lojaMusica.disco.excluir(id)
        await carregarDiscos()
    }
}
window.editarDisco = async (id) => {
    const nome = prompt('Novo nome do disco:')

    if (nome) {
        const data_lancamento = prompt('Nova data (YYYY-MM-DD):')

        if (data_lancamento) {

            await window.lojaMusica.disco.editar({
                id,
                nome,
                data_lancamento,
                gravadora_id: null
            })

            await carregarDiscos()

        }

    }

}