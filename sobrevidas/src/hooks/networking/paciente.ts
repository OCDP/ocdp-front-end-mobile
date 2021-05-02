import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetPacientes() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(nome: string, params?: O, headers?: O) => {
      return await api.get<any>(`/paciente/byName/${nome}/0/10`, {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
