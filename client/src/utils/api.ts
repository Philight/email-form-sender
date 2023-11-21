import axios from 'axios';

export interface IFetchArgs {
  url: string;
  method: axios.Method;
  data?: unknown;
  headers?: unknown;
}

export const fetchData = async ({
  url,
  method = 'GET',
  data,
  headers,
}: IFetchArgs): Promise<unknown> => {
  const options: axios.AxiosRequestConfig = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
  };

  return await axios(options);
};
