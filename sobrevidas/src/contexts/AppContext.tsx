import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import useSecStorage from '../utils/useSecStorage';
import Spinner from 'react-native-loading-spinner-overlay';

const AppContext = createContext({} as Contexts.AppContext);

export const AppProvider: React.FC = ({children}) => {
  const [dadosPacientes, setDadosPacientes] = useSecStorage<Models.Paciente[]>(
    'pacientes',
    [],
  );

  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        dadosPacientes,
        setDadosPacientes,
        loading,
        setLoading,
      }}>
      <Spinner visible={loading} animation="fade" overlayColor="#fff9" />
      {children}
    </AppContext.Provider>
  );
};

export const useLoading = () => {
  const {loading} = useContext(AppContext);
  return loading;
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
