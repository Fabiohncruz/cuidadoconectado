import { fetchUtils, useAuthProvider } from 'react-admin';

// @ts-ignore
export const apiUrl = import.meta.env.VITE_API;

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