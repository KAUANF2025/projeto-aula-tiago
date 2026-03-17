let dados = {
        valor1: null,
        valor2: null,
        operacao: null
    },
    ultimoValor = null

const visor = document.getElementById('visor')

function limpar() {
    dados.valor1 = null
    dados.valor2 = null
    dados.operacao = null
    ultimoValor = null
    visor.innerText = 0
}

function clicarBtnValor(valor) {
    if (ultimoValor) {
        visor.innerText += valor
    } else  {
       visor.innerText = valor
    } 

    if (dados.operacao) {
        if (!dados.valor2) {
            dados.valor2 = valor
        } else {
            dados.valor2 += valor
        }
        
    }
    
    ultimoValor = 'valor'
}

function clicarBtnOperacao(operacao) {
    if (ultimoValor === 'operacao') return;

    if (!dados.operacao) {
        dados.valor1 = visor.innerText
        dados.operacao = operacao
    }

    switch (operacao) {
        case 'DIV':
            visor.innerText += '÷'
            break;

        case 'MUL':
            visor.innerText += 'x'
            break;

        case 'SUB':
            visor.innerText += '-'
            break;

        case 'SUM':
            visor.innerText += '+'
            break;

        default:
            break;
    }

    ultimoValor = 'operacao'
}

async function executar() {
    const resultado = await window.calculadora.executar(dados)
    visor.innerText = resultado
}