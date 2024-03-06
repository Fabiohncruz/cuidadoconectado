import ptMessages from 'ra-language-pt-br';

export const mensagens = {
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
    pulseiras: {
      name: 'Pulseira |||| Pulseiras',
      fields: {
        userId: 'Usuário',
        codigoConexao: 'Código de Conexão',
        deviceId: 'Código da Pulseira',
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
