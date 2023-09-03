import { useCallback, useEffect, useState } from 'react';
import { IUseApiArgs, IUseApiResponse } from './useApi';
import { axiosFetch } from '@/Utils/call-api';

export interface IUseFetchAxios extends IUseApiArgs {}

export function useFetchAxios<T>({ endpoint, body }: IUseFetchAxios): IUseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = useCallback((): void => {
    setLoading(true);
    setError(null);

    axiosFetch(endpoint, body)
      .then((response) => {
        setData(response.data);
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
