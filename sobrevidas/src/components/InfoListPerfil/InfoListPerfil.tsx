import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {InfoListPerfilContainer, InfoItemPerfil} from './InfoListPerfil.styles';

interface Props {
  contentList: ListInfoPerfil[];
}
const InfoListPerfil: React.FC<Props> = ({contentList}) => {
  return (
    <InfoListPerfilContainer>
      {contentList.map(({title, description}, i) => (
        <View key={i}>
          <InfoItemPerfil>
            <Text category="c1">{title}</Text>
            <Text category="s1">{description || 'Não informado'}</Text>
          </InfoItemPerfil>
        </View>
      ))}
    </InfoListPerfilContainer>
  );
};

export default InfoListPerfil;
