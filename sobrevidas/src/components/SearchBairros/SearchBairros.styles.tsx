import {Layout, Button, Autocomplete} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const DisplayEndereco = styled(Layout)`
  margin-top: 16px;
  border-radius: 10px;
  /* width: 350px; */
  height: 160px;
  align-items: center;
`;

export const EnderecoCard = styled(Layout)`
  background-color: transparent;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const LogoPinContainer = styled(Layout)`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: transparent;
`;

export const TextEnderecoContainer = styled(Layout)`
  flex: 1;
  height: 100px;
  justify-content: center;
  background-color: transparent;
`;

export const ButtonModalContainer = styled(Button)`
  border-radius: 30px;
  width: 150px;
  align-items: center;
  margin: 16px 0px;
`;

export const AutocompleteCidade = styled(Autocomplete)`
  margin-bottom: 16px;
`;
