/* eslint react/jsx-key: off */
import * as React from 'react';
import { Admin, Resource } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import firebase from 'firebase/compat';
import i18nProvider from './providers/i18nProvider';
import AuthProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';

import Layout from './Layout';
import usuarios from './features/usuarios';
import pulseiras from './features/pulseiras';

const firebaseConfig = {
  projectId: 'zinc-hall-404714',
  apiKey: 'AIzaSyBh7Y7c9jiq8joRZy_Q7vT6aydYPwlewtc',
  authDomain: `zinc-hall-404714.firebaseapp.com`,
  storageBucket: `zinc-hall-404714.appspot.com`,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage(firebaseApp);
const authProvider = new AuthProvider(firebaseApp);

render(
  <React.StrictMode>
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider(authProvider)}
      i18nProvider={i18nProvider}
      title="Cuidado Conectado"
      layout={Layout}
    >
      <Resource name="usuarios" {...usuarios} />
      <Resource name="pulseiras" {...pulseiras} />
    </Admin>
  </React.StrictMode>,
  document.getElementById('root'),
);
