import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetCidades() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(params?: O, headers?: O) => {
      return await api.get<Models.Cidade[]>('/cidade/', {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
