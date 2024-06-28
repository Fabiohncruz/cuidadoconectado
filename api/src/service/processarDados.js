const _ = require('lodash');

function verificarPressao(dado) { }
function verificarBpm(dado) {
    const bpm = _.last(dado.result)?.samples[0].beatsPerMinute;;
    console.info('Pressao atual ',)
    if (bpm <= 30) {
        console.warn("O carra ta quase morrendo");
    }

}
function verificarLocalizacao(dado) { }

async function processarDados(pessoaId, dados) {
    console.info('Verificando dados para ', pessoaId, dados);

    for (let dado of dados) {

        if (dado.type === 'pressao') {
            verificarPressao(dado);
        }
        if (dado.type === 'bpm') {
            verificarBpm(dado);
        }
        if (dado.type === 'gps') {
            verificarLocalizacao(dado);
        }

    }
};

module.exports = processarDados;