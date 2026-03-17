const formArtista = document.getElementById('form-artista');

if (formArtista) {
    formArtista.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inputNome = formArtista.querySelector('[name="nome"]');

        await window.lojaMusica.artista.criar(inputNome.value);
        await carregarArtistas();

        formArtista.reset();
    });
}

async function carregarArtistas() {

    const listaElement = document.getElementById('lista-artistas');

    if (!listaElement) return;

    const artistas = await window.lojaMusica.artista.listar();

    listaElement.innerHTML = '';

    if (!artistas || artistas.length === 0) {

        listaElement.innerHTML = '<p>Nenhum artista cadastrado.</p>';
        return;

    }
    artistas.forEach((artista) => {

        const div = document.createElement('div');

        div.innerHTML = `
            <p>
                ${artista.nome}
                <button onclick="excluirArtista(${artista.artista_id})">
                    Excluir
                </button>
            </p>
            <hr>
        `;
        listaElement.appendChild(div);

    });

}

window.excluirArtista = async (id) => {

    if (confirm('Tem certeza que deseja excluir este artista?')) {

        await window.lojaMusica.artista.excluir(id);
        await carregarArtistas();

    }

};

window.editarArtista = async (id) => {

    const nome = prompt('Novo nome do artista:');

    if (nome) {

        await window.lojaMusica.artista.editar({ id, nome });
        await carregarArtistas();

    }

};





carregarArtistas();