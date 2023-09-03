import { useCallback, useEffect, useState } from 'react';
import { IUseApiResponse } from './useApi';
import { IAPIEndpoint, callMainAPI } from '@/Utils/call-api';

export interface IUseFetchMainAPI {
  endpoint: IAPIEndpoint;
  body?: any;
}

export function useFetchMainAPI<T>({ endpoint, body }: IUseFetchMainAPI): IUseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = useCallback((): void => {
    setLoading(true);
    setError(null);

    callMainAPI<T>(endpoint, body)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint.url, endpoint.method, endpoint.headers, body]);

  return {
    data, loading, error, refetch: fetchData,
  };
}
