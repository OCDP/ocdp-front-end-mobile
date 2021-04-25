import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import ModalFeedback from '../components/ModalFeeback/ModalFeedback';
import useSecStorage from '../utils/useSecStorage';

const AppContext = createContext({} as Contexts.AppContext);

export const AppProvider: React.FC = ({children}) => {
  const [dadosPacientes, setDadosPacientes] = useSecStorage<Models.Paciente[]>(
    'pacientes',
    [],
  );
  const [modal, setModal] = useState<Models.Modal>({
    visible: false,
    type: 'success',
    title: 'sou um modal',
    content: 'conteudo modal',
  });

  return (
    <AppContext.Provider
      value={{
        dadosPacientes,
        setDadosPacientes,
        setModal,
      }}>
      <ModalFeedback
        {...modal}
        onClose={() => setModal({...modal, visible: false})}
      />
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
