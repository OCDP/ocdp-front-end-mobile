import {Layout} from '@ui-kitten/components';
import {Image} from 'react-native';
import styled from 'styled-components';

export const RegiaoContent = styled(Layout)`
  flex: 1;
  flex-direction: column;
  background-color: red;
  align-items: center;
  justify-content: space-between;
`;

export const ImageRegiaoContainer = styled(Image)`
  width: 60px;
  height: 80px;
`;

export const ListSubregioesContainer = styled(Layout)`
  background-color: yellow;
  height: 200px;
`;
