const formMusica = document.getElementById('form-musica')
let interpretesSelecionados = []

if (formMusica) {
    carregarEstilos()
    carregarArtistas()
    carregarDiscos()
    carregarMusicas()

    document.getElementById('btn-adicionar-interprete')?.addEventListener('click', () => {
        const select = document.getElementById('interprete_select')
        const id = select.value
        if (!id || interpretesSelecionados.includes(parseInt(id))) return
        interpretesSelecionados.push(parseInt(id))
        select.value = ''
        atualizarListaInterpretes()
    })

    formMusica.addEventListener('submit', async (e) => {
        e.preventDefault()
        try {
            await window.lojaMusica.musica.criar({
                nome: document.getElementById('nome').value,
                duracao: document.getElementById('duracao').value,
                data_lancamento: document.getElementById('data_lancamento').value,
                estilo_id: parseInt(document.getElementById('estilo_id').value),
                compositor_id: parseInt(document.getElementById('compositor_id').value),
                interpretes: interpretesSelecionados,
                disco_id: document.getElementById('disco_id').value ? parseInt(document.getElementById('disco_id').value) : null
            })

            await carregarMusicas()
            formMusica.reset()
            interpretesSelecionados = []
            atualizarListaInterpretes()
            alert('Música cadastrada com sucesso!')
        } catch (error) {
            console.error('Erro ao salvar música:', error)
            alert('Erro ao cadastrar música!')
        }
    })

    document.getElementById('disco_id')?.addEventListener('change', async (e) => {
        const discoId = e.target.value
        const gravadoraInput = document.getElementById('gravadora_nome')

        if (!discoId) return gravadoraInput.value = ''

        try {
            const discos = await window.lojaMusica.disco.listar()
            const disco = discos.find(d => d.disco_id == discoId)
            gravadoraInput.value = disco?.gravadora_nome || 'Gravadora não informada'
        } catch (error) {
            console.error('Erro ao carregar gravadora:', error)
        }
    })
}

async function carregarEstilos() {
    try {
        const estilos = await window.lojaMusica.estilo.listar()
        document.getElementById('estilo_id').innerHTML =
            '<option value="">Selecione</option>' +
            estilos.map(e => `<option value="${e.estilo_id}">${e.descricao}</option>`).join('')
    } catch (error) {
        console.error('Erro ao carregar estilos:', error)
    }
}

async function carregarArtistas() {
    try {
        const artistas = await window.lojaMusica.artista.listar()
        const options = '<option value="">Selecione</option>' +
            artistas.map(a => `<option value="${a.artista_id}">${a.nome}</option>`).join('')

        document.getElementById('compositor_id').innerHTML = options
        document.getElementById('interprete_select').innerHTML = options
    } catch (error) {
        console.error('Erro ao carregar artistas:', error)
    }
}

async function carregarDiscos() {
    try {
        const discos = await window.lojaMusica.disco.listar()
        document.getElementById('disco_id').innerHTML =
            '<option value="">Nenhum</option>' +
            discos.map(d => `<option value="${d.disco_id}">${d.nome}</option>`).join('')
    } catch (error) {
        console.error('Erro ao carregar discos:', error)
    }
}

function atualizarListaInterpretes() {
    const lista = document.getElementById('lista-interpretes-adicionados')
    if (!lista) return

    window.lojaMusica.artista.listar().then(artistas => {
        lista.innerHTML = interpretesSelecionados.length === 0
            ? '<li>Nenhum intérprete adicionado</li>'
            : interpretesSelecionados.map(id => {
                const a = artistas.find(a => a.artista_id === id)
                return `<li>${a?.nome || 'Desconhecido'} <button onclick="removerInterprete(${id})">Remover</button></li>`
            }).join('')
    }).catch(error => console.error('Erro ao carregar artistas:', error))
}

window.removerInterprete = (id) => {
    interpretesSelecionados = interpretesSelecionados.filter(i => i !== id)
    atualizarListaInterpretes()
}

async function carregarMusicas() {
    try {
        const musicas = await window.lojaMusica.musica.listar()
        const listaMusicas = document.getElementById('lista-musicas')

        if (!musicas?.length) return listaMusicas.innerHTML = '<p>Nenhuma música cadastrada.</p>'

        console.log('Músicas carregadas:', musicas)

        listaMusicas.innerHTML = musicas.map(m => `
            <div>
                <h3>${m.nome || 'Sem nome'}</h3>
                <p><strong>Duração:</strong> ${m.duracao || '00:00'} | <strong>Lançamento:</strong> ${m.data_lancamento || 'Não informado'}</p>
                <p><strong>Estilo:</strong> ${m.estilo_nome || 'Não informado'} | <strong>Compositor:</strong> ${m.compositor_nome}</p>
                <p><strong>Intérpretes:</strong> ${m.interpretes}</p>
                <p><strong>Disco:</strong> ${m.disco_nome} | <strong>Gravadora:</strong> ${m.gravadora_nome}</p>
                <button onclick="excluirMusica(${m.musica_id})">Excluir</button>
            </div>
        `).join('')
    } catch (error) {
        console.error('Erro ao carregar músicas:', error)
        document.getElementById('lista-musicas').innerHTML =
            '<p style="color:red;">Erro ao carregar músicas. Verifique o console.</p>'
    }
}

window.excluirMusica = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta música?')) return
    try {
        await window.lojaMusica.musica.excluir(id)
        await carregarMusicas()
        alert('Música excluída com sucesso!')
    } catch (error) {
        console.error('Erro ao excluir música:', error)
        alert('Erro ao excluir música!')
    }
}