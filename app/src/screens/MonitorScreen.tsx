import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button, ListItem, Text } from '@rneui/themed';
import { HealthMonitor } from '../service/health-monitor';
import { useAuthContext } from '../context/AuthContext.tsx';
import { useHttpClient } from '../service/http.tsx';
import auth from '@react-native-firebase/auth';

interface MonitorScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const MonitorScreen = ({ navigation }: MonitorScreenProps) => {

  const healthMonitor = new HealthMonitor();

  const { authState, setAuth } = useAuthContext();
  const { httpClient, loading, error } = useHttpClient();
  const [monitoramento, setMonitoramento] = useState(false);
  const [pessoa, setPessoa] = useState();

  useEffect(() => {
    const getPessoaById = (accessToken: string) => {
      if (!authState.pessoaId) {
        return Promise.reject();
      }
      return httpClient('/pessoas/' + authState.pessoaId, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    };

    auth().currentUser?.getIdToken(true)
      .then(getPessoaById)
      .then(response => {

        setPessoa(response);

        console.log('Configuration envio para', response.id);
        // Método para enviar os dados para o Backend
        const enviarDados = async (pessoa: any, dados: any) => {

          if (!pessoa || !pessoa.id) {
            console.warn('Não foi possível enviar os dados', pessoa);
            return;
          }

          console.log(new Date(), ' Push dados de monitoramento', pessoa.id);
          await httpClient('/dados', {
            method: 'post',
            body: {
              pessoaId: pessoa.id,
              dados,
            },
          });
        };

        if (!response) {
          setAuth({});
          navigation.navigate('CadastroDispositivo');
          return;
        }

        // Registar o método no coletor de dados e inicia
        healthMonitor.onCollect(dados => enviarDados(response, dados))
          .start(response.config)
          .then(() => {
            setMonitoramento(true);
          });
      });

    return () => {
      healthMonitor.stop();
      setMonitoramento(false);
    };
  }, [authState]);

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return <View>

    <Text h3>Seu monitoramento está: {monitoramento ? 'Ativo' : 'Inativo'}</Text>


    <Text h4>Lista de Medicamentos</Text>

    <ListItem>
      {pessoa?.medicamentos?.map(medicamento => (
        <ListItem.Content>
        <ListItem.Title>{medicamento.nome}</ListItem.Title>
        <ListItem.Subtitle>{new Date(medicamento.horario).getHours()?.toString()?.padStart(2, '0')}:{new Date(medicamento.horario)?.getUTCMinutes()?.toString()?.padStart(2, '0')}</ListItem.Subtitle>
      </ListItem.Content>
      ))}
    </ListItem>

    <Button
      title="Desconectar"
      buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
      onPress={async () => {
        await healthMonitor.stop();
        await setAuth({});
        Alert.alert(
          'Usuário Desconectado',
          `Seu perfil foi desconectado e seu monitoramento não está mais ativo`,
        );
        navigation.navigate('Inicio');
      }}
    />
  </View>;
};

export default MonitorScreen;