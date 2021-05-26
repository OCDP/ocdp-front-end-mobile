import {Divider, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import FemaleDefaultUser from '../../assets/img/FemaleDefaultUser';
import FemaleDoctor from '../../assets/img/FemaleDoctor';
import MaleDefaultUser from '../../assets/img/MaleDefaultUser';
import MaleDoctor from '../../assets/img/MaleDoctor';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {
  HeaderContainer,
  HeaderLine,
  LogoContainer,
  InfosHeader,
} from './PerfilHeader.styles';

interface Props {
  type: 'MEDICO' | 'PACIENTE';
  sexo: Models.Sexo;
  title: string;
  subtitle: string;
}
const PerfilHeader: React.FC<Props> = ({type, sexo, title, subtitle}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);
  return (
    <>
      <HeaderLine color={themeColors['color-primary-300']} />
      <HeaderContainer>
        <LogoContainer>
          {type === 'MEDICO' ? (
            sexo === 'FEMININO' ? (
              <FemaleDoctor
                size={80}
                color={themeColors['color-primary-400']}
              />
            ) : (
              <MaleDoctor size={80} color={themeColors['color-primary-500']} />
            )
          ) : sexo === 'FEMININO' ? (
            <FemaleDefaultUser
              size={80}
              color={themeColors['color-primary-400']}
            />
          ) : (
            <MaleDefaultUser
              size={80}
              color={themeColors['color-primary-500']}
            />
          )}
        </LogoContainer>

        <InfosHeader>
          <Text category="h3">{title}</Text>
          <Text category="s1">{subtitle}</Text>
        </InfosHeader>
      </HeaderContainer>
      <Divider />
    </>
  );
};

export default PerfilHeader;
