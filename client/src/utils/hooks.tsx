import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const usePrevious = (value: string) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useFetch = (url: string): any => {
  const [state, setState] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { response: state };
};

export const useAPI = (url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', bodyData?: any) => {
  const [state, setState] = useState<any>();
  // console.log('useAPI');

  const CRUD = method ?? 'GET';

  useEffect(() => {
    const options = {
      url,
      method: CRUD,
      headers: {
        'Content-Type': 'application/json',
      },
      data: bodyData,
      timeout: null,
    };

    const fetchData = async (): void => {
      const data = await axios(options);
      // console.log('useAPI data response');
      // console.log(data);
      setState(data);
    };

    fetchData();
  }, [url, CRUD, data]);

  return { response: state };
};
