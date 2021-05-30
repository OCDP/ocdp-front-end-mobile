import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetFatoresRisco() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(params?: O, headers?: O) => {
      return await api.get<Models.FatorRisco[]>('/fatorRisco/', {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
