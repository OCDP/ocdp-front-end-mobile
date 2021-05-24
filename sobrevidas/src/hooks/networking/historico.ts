import {useCallback} from 'react';
import api from '../../utils/api';
import useHeaders from './useHeaders';

export function useGetHistoricoPaciente() {
  const {auth} = useHeaders();
  return useCallback(
    async <O extends Object>(cpfPaciente:number, params?: O, headers?: O) => {
      return await api.get<Models.Historico[]>('/historico/atendimentos/cpf/' + cpfPaciente, {
        params,
        headers,
        auth,
      });
    },
    [auth],
  );
}
