import {useContext} from 'react';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';

export default function () {
  const {usuarioLogado} = useContext(UsuarioLogadoContext);

  return {
    auth: {
      username: usuarioLogado.cpf,
      password: usuarioLogado.senhaUsuario,
    },
  };
}
