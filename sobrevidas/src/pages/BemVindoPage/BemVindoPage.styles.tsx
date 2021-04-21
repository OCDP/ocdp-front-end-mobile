import {Text} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const BemVindoContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

export const ButtonContainer = styled.View`
  width: 200px;
`;

export const TextContainer = styled(Text)`
  font-size: 16px;
  max-width: 300px;
  text-align: center;
`;
