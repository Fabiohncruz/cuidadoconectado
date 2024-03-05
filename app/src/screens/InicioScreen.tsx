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
  const { ready, auth, setAuth } = useAuthContext();

  useEffect(() => {
    console.log(ready, auth);
    let redirect;
    if (ready && auth.authenticated) {
      if (auth.type === 'login') {
        // se o usuário tiver se autneticado com login, tela inicial é a logada
        redirect = 'Sample';
      } else if (auth.type === 'device') {
        // caso seja um dispositvio, tela inicial é a monitor
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
        title="Efetuar Login como Tutor/Responsável"
        buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
        title="Adicionar Dispositivo"
        buttonStyle={{ backgroundColor: '#28a745', marginVertical: 10 }}
        onPress={() => {
          setAuth({
            authenticated: true,
            accessToken: '',
            type: 'device',
          });
          navigation.navigate('CadastroDispositivo');
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
