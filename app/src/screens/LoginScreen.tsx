import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';

interface LoginScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h3>Entrar com Usuário e Senha</Text>
      <Input
        placeholder="Usuário"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
      />
      <Input
        placeholder="Senha"
        secureTextEntry={true}
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
      />
      <Button
        title="Login"
        buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
        onPress={() => {
          // Navegar para a próxima tela após o login
          navigation.navigate('Sample');
        }}
      />
    </View>
  );
};

export default LoginScreen;
