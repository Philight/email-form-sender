import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const usePrevious = (value: string) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useAPI = (url: string, method?: axios.Method = 'GET', bodyData?: unknown) => {
  const [response, setResponse] = useState<unknown>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      setLoading(true);

      try {
        const options: axios.AxiosRequestConfig = {
          url,
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          data: bodyData,
          timeout: null,
        };

        const { data } = await axios(options);

        if (isMounted) {
          setResponse(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method, bodyData]);

  return { response, isLoading };
};
