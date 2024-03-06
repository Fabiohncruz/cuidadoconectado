import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';

interface CadastroDispositivoScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const CadastroDispositivoScreen: React.FC<CadastroDispositivoScreenProps> = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');

  const cadastrarDispositivo = () => {
    // Aqui você pode adicionar a lógica para cadastrar o dispositivo com o código fornecido
    console.log('Cadastrando dispositivo com código:', codigo);

    // TODO fazer a integração com a API para registrar o dispositivo
    // Se der certo,  no caso o código existir, redireciona para a tela de Monitor
    navigation.navigate('Monitor');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h3>Código de Acompanhamento</Text>
      <Input
        placeholder="Digite o código"
        value={codigo}
        onChangeText={setCodigo}
        leftIcon={{ type: 'font-awesome', name: 'barcode' }}
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