import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './screens/InicioScreen';
import CadastroDispositivoScreen from './screens/CadastrarDispositivoScreen';
import SampleScreen from './screens/Sample';
import LoginScreen from './screens/LoginScreen';
import { ThemeProvider } from '@rneui/themed';
import MonitorScreen from './screens/MonitorScreen';
import { AuthProvider } from './context/AuthContext.tsx';

const Stack = createStackNavigator();

const NavigationAuthAware = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="CadastroDispositivo" component={CadastroDispositivoScreen}/>
      <Stack.Screen name="Monitor" component={MonitorScreen} options={{
        headerLeft: () => null,
      }}/>
      <Stack.Screen name="Sample" component={SampleScreen}/>
    </Stack.Navigator>
  </NavigationContainer>;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationAuthAware/>
      </AuthProvider>
    </ThemeProvider>
  );
}