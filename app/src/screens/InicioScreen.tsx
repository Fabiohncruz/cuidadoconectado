import * as React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthContext } from '../context/AuthContext.tsx';

interface InicioScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const InicioScreen: React.FC<InicioScreenProps> = ({ navigation }) => {
  const { ready, authState } = useAuthContext();

  useEffect(() => {
    let redirect;
    if (ready) {
      if (authState.codigoConexao) {
        redirect = 'Monitor';
      }
    }
    if (redirect) {
      navigation.navigate(redirect);
    }
  }, [ready]);

  if (!ready) {
    return <ActivityIndicator/>;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h1>Bem-vindo</Text>
      <Button
        title="Entrar como Tutor/Responsável"
        buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
        onPress={() => {
          navigation.navigate('App');
        }}
      />
      <Button
        title="Entrar com Código para Acompanhamento"
        buttonStyle={{ backgroundColor: '#28a745', marginVertical: 10 }}
        onPress={() => {
          navigation.navigate('CadastroDispositivo');
        }}
      />
      <Button
        title="Criar Conta"
        buttonStyle={{ backgroundColor: '#7b7f86', marginVertical: 10 }}
        onPress={() => {
          navigation.navigate('CriarConta');
        }}
      />
      <Icon
        name="user"
        color="black"
        size={50}
      />
    </View>
  );
};

export default InicioScreen;
