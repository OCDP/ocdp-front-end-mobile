import {Modal, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import Check from '../../assets/img/Check';
import Close from '../../assets/img/Close';
import {
  ModalCardContainer,
  ModalCard,
  LogoModalContainer,
  TextModalContainer,
  ButtonModalContainer,
} from './ModalFeedback.styles';

type Props = {
  onClose: () => void;
} & Models.Modal;

const ModalFeedback: React.FC<Props> = ({
  visible,
  content,
  title,
  type,
  onClose,
}) => {
  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  });

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onClose}>
      <ModalCardContainer level="1">
        <ModalCard>
          <LogoModalContainer>
            {type === 'error' ? <Close size={60} /> : <Check size={60} />}
          </LogoModalContainer>

          <TextModalContainer>
            <Text category="s1">{title}</Text>
            <Text>{content}</Text>
          </TextModalContainer>
        </ModalCard>
        <ButtonModalContainer onPress={onClose}>Voltar</ButtonModalContainer>
      </ModalCardContainer>
    </Modal>
  );
};

export default ModalFeedback;
