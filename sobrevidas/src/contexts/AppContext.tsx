import {Modal, Text} from '@ui-kitten/components';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import Check from '../assets/img/Check';
import Close from '../assets/img/Close';
import useSecStorage from '../utils/useSecStorage';
import {
  ButtonModalContainer,
  LogoModalContainer,
  ModalCard,
  ModalCardContainer,
  TextModalContainer,
} from './AppContext.styles';

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

  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  });

  return (
    <AppContext.Provider
      value={{
        dadosPacientes,
        setDadosPacientes,
        setModal,
      }}>
      <Modal
        visible={modal.visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModal({...modal, visible: false})}>
        <ModalCardContainer level="1">
          <ModalCard>
            <LogoModalContainer>
              {modal.type === 'error' ? (
                <Close size={60} />
              ) : (
                <Check size={60} />
              )}
            </LogoModalContainer>

            <TextModalContainer>
              <Text category="s1">{modal.title}</Text>
              <Text>{modal.content}</Text>
            </TextModalContainer>
          </ModalCard>
          <ButtonModalContainer
            onPress={() => setModal({...modal, visible: false})}>
            Voltar
          </ButtonModalContainer>
        </ModalCardContainer>
      </Modal>
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
