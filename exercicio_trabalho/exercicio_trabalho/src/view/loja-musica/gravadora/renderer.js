const formGravadora = document.getElementById('form-gravadora')
if (formGravadora) {
    carregarGravadoras()
    formGravadora.addEventListener('submit', async (event) => {
        event.preventDefault()
        const nome = document.getElementById('nome').value
        await window.lojaMusica.gravadora.criar(nome)
        await carregarGravadoras()
        formGravadora.reset()
    })
}
async function carregarGravadoras() {
    const lista = document.getElementById('lista-gravadoras')
    const gravadoras = await window.lojaMusica.gravadora.listar()
    
    lista.innerHTML = gravadoras.map(g => `
        <p>
            ${g.nome}
            <button onclick="editarGravadora(${g.gravadora_id})">Editar</button>
            <button onclick="excluirGravadora(${g.gravadora_id})">Excluir</button>
        </p>
        <hr>
    `).join('')
}
window.excluirGravadora = async (id) => {
    if (confirm('Tem certeza?')) {
        await window.lojaMusica.gravadora.excluir(id)
        await carregarGravadoras()
    }
}
window.editarGravadora = async (id) => {
    const nome = prompt('Digite o novo nome da gravadora:')
    if (nome) {
        await window.lojaMusica.gravadora.editar({ id, nome })
        await carregarGravadoras()
    }
}