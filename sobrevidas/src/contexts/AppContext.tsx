import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import useSecStorage from '../utils/useSecStorage';

const AppContext = createContext({} as Contexts.AppContext);

export const AppProvider: React.FC = ({children}) => {
  const [dadosPacientes, setDadosPacientes] = useSecStorage<Models.Paciente[]>(
    'pacientes',
    [],
  );

  return (
    <AppContext.Provider
      value={{
        dadosPacientes,
        setDadosPacientes,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export function useDadosPacientes(): [
  Models.Paciente[],
  Dispatch<SetStateAction<Models.Paciente[]>>,
] {
  const {dadosPacientes, setDadosPacientes} = useContext(AppContext);
  return [dadosPacientes, setDadosPacientes];
}

export const AppConsumer = AppContext.Consumer;

export default AppContext;
