import React, {useContext} from 'react';
import EmptySearch from '../../assets/img/EmptySearch';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {EmptyContentContainer, TextEmptyMessage} from './EmptyContent.styles';

interface Props {
  emptyMessage: string;
}
const EmptyContent: React.FC<Props> = ({emptyMessage}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);
  return (
    <EmptyContentContainer>
      <EmptySearch size={100} color={themeColors['color-primary-500']} />
      <TextEmptyMessage>{emptyMessage}</TextEmptyMessage>
    </EmptyContentContainer>
  );
};

export default EmptyContent;
