import { fetchUtils, useAuthProvider } from 'react-admin';

const apiUrl = 'http://localhost:3000';

const httpClient = (url, options = {}) => {
  return fetchUtils.fetchJson(
    apiUrl + url, options);
};

export const useHttpClient = () => {

  const authProvider = useAuthProvider();

  const httpClientWithJwtHandler = (url, options) => authProvider.getJWTToken().then(jwt =>
    httpClient(url, {
      ...options,
      user: {
        authenticated: !!jwt,
        token: `Bearer ${jwt}`,
      },
    }));
  return httpClientWithJwtHandler;
};

export default httpClient;