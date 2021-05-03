import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetBairrosByCity() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(cidade?: number, params?: O, headers?: O) => {
      return await api.get<Models.Bairro[]>(`bairro/byCidade/${cidade}`, {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
