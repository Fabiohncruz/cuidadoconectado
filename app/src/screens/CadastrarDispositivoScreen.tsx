import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useAuthContext } from '../context/AuthContext.tsx';
import DeviceInfo from 'react-native-device-info';
import { useHttpClient } from '../service/http.tsx';
import auth from '@react-native-firebase/auth';

interface CadastroDispositivoScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const CadastroDispositivoScreen: React.FC<CadastroDispositivoScreenProps> = ({ navigation }) => {
  const { setAuth } = useAuthContext();
  const [codigoConexao, setCodigoConexao] = useState('');
  const { httpClient, loading, error } = useHttpClient();

  const cadastrarDispositivo = async () => {
    console.log('Cadastrando dispositivo com código:', codigoConexao);

    try {
      const model = await DeviceInfo.getModel();
      const uniqueId = await DeviceInfo.getUniqueId();
      const deviceId = `${model}_${uniqueId}`;

      const result = await httpClient('/dispositivos', {
        method: 'POST',
        body: {
          codigoConexao: codigoConexao.toUpperCase(),
          deviceId,
        },
      });

      if (!result) {
        return;
      }
      console.log('Resultado cadastro', result);
      await auth().signInWithCustomToken(result.token);

      setAuth({
        codigoConexao: codigoConexao.toUpperCase(),
        pessoaId: result.pessoaId,
      });

      navigation.navigate('Monitor');
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    }
  };

  if (error) {
    Alert.alert('Erro', error?.message);
  }

  if (loading) {
    return <ActivityIndicator/>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h3>Código de Acompanhamento</Text>
      <Input
        placeholder="Digite o código"
        value={codigoConexao}
        onChangeText={setCodigoConexao}
        // leftIcon={{ type: 'font-awesome', name: 'barcode' }}
      />
      <Button
        title="Cadastrar Dispositivo"
        buttonStyle={{ backgroundColor: '#28a745', marginVertical: 10 }}
        onPress={cadastrarDispositivo}
      />
    </View>
  );
};

export default CadastroDispositivoScreen;