const executar = (dados) => {
    console.log("calculadora", dados)

    switch (dados.operacao) {
        case 'SUM':
            return Number(dados.valor1) + Number(dados.valor2)

        case 'SUB':
            return Number(dados.valor1) - Number(dados.valor2)

        case 'MUL':
            return Number(dados.valor1) * Number(dados.valor2)

        case 'DIV':
            // deve ser tratado / por 0
            return Number(dados.valor1) / Number(dados.valor2)
    }
}

module.exports = {
    executar
}