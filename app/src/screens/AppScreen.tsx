import * as React from 'react';
import WebView from 'react-native-webview';

interface AppScreenProps {
  navigation: any; // navigation prop for navigation between screens
}

const AppScreen: React.FC<AppScreenProps> = ({ navigation }) => {
  return <WebView source={{ uri: 'http://192.168.0.115:8080' }} style={{ flex: 1 }}/>;
};

export default AppScreen;
