import ptMessages from 'ra-language-pt-br';

export const mensagens: any = {
  ...ptMessages,
  resources: {
    usuarios: {
      name: 'Usuário |||| Usuários',
      fields: {
        displayName: 'Nome Completo',
        email: 'Email',
        password: 'Senha',
      },
    },
    pessoas: {
      name: 'Pessoa |||| Pessoas',
      fields: {
        usuarioId: 'Responsável',
        codigoConexao: 'Código de Conexão',
        deviceId: 'Código do Dispositivo',
        dataNascimento: 'Data de Nascimento',
        config: {
          gps: 'Ver Localização em Tempo Real',
          bpm: 'Monitorar Batimentos por Minuto (BPM)',
          pressao: 'Monitorar Pressão Arterial'
        }
      },
    },
  },
};

export default mensagens;
