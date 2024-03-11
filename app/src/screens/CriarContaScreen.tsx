import * as React from 'react';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import auth from '@react-native-firebase/auth';

interface CriarContaScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const CriarContaScreen: React.FC<CriarContaScreenProps> = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Informe os campos para efetuar o cadastro');
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Sucesso', 'Conta cadastrada com sucesso');
      navigation.navigate('Inicio');
    } catch (err: any) {
      Alert.alert('Erro', err?.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h3>Criar uma nova conta</Text>
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        secureTextEntry={true}
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Criar Conta"
        buttonStyle={{ backgroundColor: '#007bff', marginVertical: 10 }}
        onPress={handleCreate}
      />
    </View>
  );
};

export default CriarContaScreen;
