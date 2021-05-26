import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetPacientes() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(nome: string, params?: O, headers?: O) => {
      return await api.get<Models.Paciente[]>(
        `/paciente/byName/${nome}/0/10/`,
        {
          params,
          headers,
          auth,
        },
      );
    },
    [auth],
  );
}

export function useGetPaciente() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(id: string, params?: O, headers?: O) => {
      return await api.get<Models.Paciente>(`/paciente/byId/${id}/`, {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}

export function usePostPaciente() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(body?: O, params?: O, headers?: O) => {
      await api.post<Models.Paciente>('/paciente/', body, {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
