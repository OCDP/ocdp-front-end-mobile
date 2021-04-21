import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useLoginUsuario() {
  return useCallback(
    async <O extends Object>(
      cpf: string,
      senha: string,
      params?: O,
      headers?: O,
    ) => {
      return await api.get<Models.Usuario>(
        `/usuario/byCpf/${cpf}?cpf=${cpf}/`,
        {
          params,
          headers,
          auth: {
            username: cpf,
            password: senha,
          },
        },
      );
    },
    [],
  );
}

export function usePostUsuario() {
  const authHeaders = useHeaders();

  return useCallback(
    async <O extends Object>(
      body?: O,
      params?: O,
      headers: any = authHeaders,
    ) => {
      await api.post<Models.Usuario>('/usuario/', body, {params, headers});
    },
    [authHeaders],
  );
}

export function usePatchUsuario() {
  const authHeaders = useHeaders();
  return useCallback(
    async <O extends Object>(
      id: string,
      body?: O,
      params?: O,
      headers: any = authHeaders,
    ) => {
      await api.patch<Partial<Models.Usuario>>(`/usuario/${id}/`, body, {
        params,
        headers,
      });
    },
    [authHeaders],
  );
}
