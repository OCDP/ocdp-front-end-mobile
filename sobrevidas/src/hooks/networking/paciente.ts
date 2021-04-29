import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetPacientes() {
  const authHeaders = useHeaders();
  return useCallback(
    async <O extends Object>(
      nome: string,
      params?: O,
      headers: any = authHeaders,
    ) => {
      return await api.get<any>(`/paciente/byName/${nome}/1/15`, {
        params,
        headers,
      });
    },
    [authHeaders],
  );
}
