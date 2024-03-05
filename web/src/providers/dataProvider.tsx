import { fetchUtils } from "react-admin";
import queryString from "query-string";
import { parseDataAndUpload } from "./fileParser";

const apiUrl = "http://localhost:3000";
const httpClient = fetchUtils.fetchJson;

const withJwt = (jwt) => ({
  user: {
    authenticated: !!jwt,
    token: `Bearer ${jwt}`,
  },
});

export default (authProvider) => {
  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, withJwt(jwt));
      return {
        data: json.data,
        total: json.total,
      };
    },

    getOne: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, withJwt(jwt));
      return { data: json };
    },

    getMany: async (resource, params) => {
      const query = {
        filter: JSON.stringify({ ids: params.ids }),
      };
      const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, withJwt(jwt));
      return json;
    },

    getManyReference: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
      const jwt = await authProvider.getJWTToken();
      const { json, headers } = await httpClient(url, withJwt(jwt));
      return {
        data: json.data,
        total: json.total,
      };
    },

    create: async (resource, params) => {
      const parsedData = await parseDataAndUpload(resource, params.data);
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(parsedData),
        ...withJwt(jwt),
      });
      return { data: { ...params.data, id: json.id } };
    },

    update: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const jwt = await authProvider.getJWTToken();
      const parsedData = await parseDataAndUpload(resource, params.data);
      const { json } = await httpClient(url, {
        method: "PATCH",
        body: JSON.stringify(parsedData),
        ...withJwt(jwt),
      });
      return { data: json };
    },

    updateMany: async (resource, params) => {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
        ...withJwt(jwt),
      });
      return { data: json };
    },

    delete: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, {
        method: "DELETE",
        ...withJwt(jwt),
      });
      return { data: json };
    },

    deleteMany: async (resource, params) => {
      const url = `${apiUrl}/${resource}`;
      const jwt = await authProvider.getJWTToken();
      const { json } = await httpClient(url, {
        method: "DELETE",
        body: JSON.stringify(params.ids),
        ...withJwt(jwt),
      });
      return { data: json.ids.map((id) => ({ id })) };
    },
  };
};
