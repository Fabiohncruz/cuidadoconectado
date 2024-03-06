import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { HealthMonitor } from '../service/health-monitor';
import { useAuthContext } from '../context/AuthContext.tsx';

const healthMonitor = new HealthMonitor();

interface MonitorScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const MonitorScreen = ({ navigation }: MonitorScreenProps) => {

  const { auth, setAuth } = useAuthContext();
  const [monitoramento, setMonitoramento] = useState(false);

  useEffect(() => {
    console.log(MonitorScreen.name, auth);
    if (auth.authenticated) {
      healthMonitor.start();
      setMonitoramento(true);
    }
    return () => {
      healthMonitor.stop();
      setMonitoramento(false);
    };
  }, []);

  return <View>

    <Text h3>Seu monitoramento está: {monitoramento ? 'Ativo' : 'Inativo'}</Text>

    <Button
      title="Desconectar"
      buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
      onPress={async () => {
        await healthMonitor.stop();
        await setAuth({ authenticated: false });
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