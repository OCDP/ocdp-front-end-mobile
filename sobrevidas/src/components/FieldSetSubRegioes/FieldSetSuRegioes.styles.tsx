import {Image, View} from 'react-native';
import styled from 'styled-components';

export const RegiaoContent = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ImageRegiaoContainer = styled(Image)`
  width: 150px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const ListSubregioesContainer = styled(View)`
  margin-top: 8px;
`;

export const EmptySubRegiaoContent = styled(View)`
  height: 400px;
`;
