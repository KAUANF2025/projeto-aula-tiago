const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Serviços
const services = {
  calculadora: require('./service/calculadora/calculadoraService'),
  contador: require('./service/contador/contadorService'),
  estilo: require('./service/loja-musica/estilo'),
  artista: require('./service/loja-musica/artista'),
  gravadora: require('./service/loja-musica/gravadora'),
  musica: require('./service/loja-musica/musica'),
  disco: require('./service/loja-musica/disco'),
  musicaDisco: require('./service/loja-musica/disco'),
  compositor: require('./service/loja-musica/compositor'),
  interprete: require('./service/loja-musica/interprete')
};

console.log('Estou executando no node!');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, "preload.js") }
  });

  win.loadFile(path.resolve('src/view/index.html'));
};

const createIpcMain = () => {
  // Contador e Calculadora
  ipcMain.handle("contador:incrementar", () => services.contador.incrementar());
  ipcMain.handle("contador:pegarValor", () => services.contador.pegarValor());
  ipcMain.handle("calculadora:executar", (event, dados) => services.calculadora.executar(dados));

  // Função genérica para registrar serviços de CRUD
  const registrarCrud = (nome, service) => {
    ['criar', 'listar', 'editar', 'excluir', 'buscarPorId', 'listarParaSelect'].forEach(acao => {
      if (typeof service[acao] === 'function') {
        ipcMain.handle(`lojaMusica:${nome}:${acao}`, (event, dados) => service[acao](dados));
      }
    });
  };

  registrarCrud('estilo', services.estilo);
  registrarCrud('artista', services.artista);
  registrarCrud('gravadora', services.gravadora);
  registrarCrud('musica', services.musica);
  registrarCrud('disco', services.disco);
  registrarCrud('musicaDisco', services.musicaDisco);
  registrarCrud('compositor', services.compositor);
  registrarCrud('interprete', services.interprete);
};

app.whenReady().then(() => {
  console.log('App Electron iniciado!');
  createIpcMain();
  createWindow();
});