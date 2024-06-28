import { useState } from 'react';
import { apiUrl } from '../config.tsx';

export const httpClient = (input: RequestInfo, init?: RequestInit) => {
  const body = init?.body ? JSON.stringify(init.body) : undefined;
  let headers = init?.headers ?? {};
  if (body) {
    headers = {
      ...headers,
      'Content-Type': 'application/json',
    };
  }
  return fetch(`${apiUrl}${input}`, {
    ...init,
    headers,
    body,
  });
};

export const useHttpClient = () => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const client = async (input: RequestInfo, init?: Omit<RequestInit, 'body'> & { body?: any }) => {
    setLoading(true);
    return httpClient(input, init)
      .then(res => {
        if(res.status >= 400){
          return Promise.reject(res.json());
        }
        return Promise.resolve(res.json());
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setError(undefined);
        return data;
      }).catch(error => {
        setError(error);
        setLoading(false);
        setData(undefined);
      });
  };

  return { error, loading, data, httpClient: client };

};