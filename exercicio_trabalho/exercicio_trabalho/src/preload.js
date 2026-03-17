const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("versao", {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron
});
contextBridge.exposeInMainWorld("contador", {
    incrementar: () => {
        return ipcRenderer.invoke("contador:incrementar")
    },
    zerar: () => {
        return ipcRenderer.invoke("contador:zerar")
    },
    pegarValor: () => {
        return ipcRenderer.invoke("contador:pegarValor")
    }
})

contextBridge.exposeInMainWorld("calculadora", {
    executar: (dados) => {
        console.log('>>> preload.js > calculadora.executar() ', dados)
        return ipcRenderer.invoke("calculadora:executar", dados)
    }
})
contextBridge.exposeInMainWorld("lojaMusica", {
    estilo: {
        criar: (descricao) => ipcRenderer.invoke("lojaMusica:estilo:criar", descricao),
        listar: () => ipcRenderer.invoke("lojaMusica:estilo:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:estilo:excluir", id),
        editar: ({id, descricao}) => ipcRenderer.invoke("lojaMusica:estilo:editar",{id, descricao})
    },
    gravadora: {
        criar: (nome) => ipcRenderer.invoke("lojaMusica:gravadora:criar", nome),
        listar: () => ipcRenderer.invoke("lojaMusica:gravadora:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:gravadora:excluir", id),
        editar: ({id, nome}) => ipcRenderer.invoke("lojaMusica:gravadora:editar",{id, nome})
    },
    artista: {
        criar: (nome) => ipcRenderer.invoke("lojaMusica:artista:criar", nome),
        listar: () => ipcRenderer.invoke("lojaMusica:artista:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:artista:excluir", id),
        editar: ({id, nome}) => ipcRenderer.invoke("lojaMusica:artista:editar",{id, nome})
    },

    musicaDisco: {
        criar: ({musica_id, disco_id}) => ipcRenderer.invoke("lojaMusica:musicaDisco:criar", {musica_id, disco_id}),
        listar: () => ipcRenderer.invoke("lojaMusica:musicaDisco:listar"),
        excluir: ({musica_id, disco_id}) => ipcRenderer.invoke("lojaMusica:musicaDisco:excluir", {musica_id, disco_id})
    },

    musica: {
        criar: (dados) => ipcRenderer.invoke("lojaMusica:musica:criar", dados),
        listar: () => ipcRenderer.invoke("lojaMusica:musica:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:musica:excluir", id),
        editar: ({id, nome, duracao, data_lancamento, estilo_id}) => 
            ipcRenderer.invoke("lojaMusica:musica:editar", {id, nome, duracao, data_lancamento, estilo_id})
        },
    
    disco: {
        criar: (dados) => ipcRenderer.invoke("lojaMusica:disco:criar", dados),
        listar: () => ipcRenderer.invoke("lojaMusica:disco:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:disco:excluir", id),
        editar: ({id, nome, data_lancamento, imagem, gravadora_id}) => 
            ipcRenderer.invoke("lojaMusica:disco:editar", {id, nome, data_lancamento, imagem, gravadora_id})
    },
    
    compositor: {
        criar: ({musica_id, artista_id}) => ipcRenderer.invoke("lojaMusica:compositor:criar", {musica_id, artista_id}),
        listar: () => ipcRenderer.invoke("lojaMusica:compositor:listar"),
        excluir: ({musica_id, artista_id}) => ipcRenderer.invoke("lojaMusica:compositor:excluir", {musica_id, artista_id})
    },

    interprete: {
        criar: ({musica_id, artista_id}) => ipcRenderer.invoke("lojaMusica:interprete:criar", {musica_id, artista_id}),
        listar: () => ipcRenderer.invoke("lojaMusica:interprete:listar"),
        excluir: ({musica_id, artista_id}) => ipcRenderer.invoke("lojaMusica:interprete:excluir", {musica_id, artista_id})
    },
    musica: {
        criar: (dados) => ipcRenderer.invoke("lojaMusica:musica:criar", dados),
        listar: () => ipcRenderer.invoke("lojaMusica:musica:listar"),
        listarParaSelect: () => ipcRenderer.invoke("lojaMusica:musica:listarParaSelect"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:musica:excluir", id),
        editar: (dados) => ipcRenderer.invoke("lojaMusica:musica:editar", dados),
        buscarPorId: (id) => ipcRenderer.invoke("lojaMusica:musica:buscarPorId", id)
}  
})