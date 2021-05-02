import React, { useContext, useState } from 'react';
import {
  Container,
  ContainerFooter,
  ContainerItem,
  ItemMenuText,
  LineCurrentRoute,
  HeaderContainer,
  ChildContain,
  TextPageTitle,
} from './ProgressSteps.styles';
import { Button, withStyles } from '@ui-kitten/components';
import { personOutline, calendar, minimalBack, settings } from '../icons';
import { useRoute } from '@react-navigation/native';
import { Alert, Text, View } from 'react-native';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';

interface Props {
  size: number,
  step: number,
  flexInfo: number
}

export const ProgressSteps: React.FC<Props> = ({
  size, step, flexInfo,
  ...props
}) => {
  const { eva, style } = props as any;
  // const [arrSize] = useState(Array<any>(size))
  const [arrSize] = useState(Array<any>(size).fill(""))
  const { themeColors } = useContext(UsuarioLogadoContext);
  const currentRoute = useRoute();

  return (
    <View style={{ flex: flexInfo, flexDirection: 'row' }}>
      {arrSize.map((v, i) => (
        <View style={{ flex: 1, backgroundColor: (i < step - 1) ? themeColors["color-primary-500"] : ((i == step - 1) ? themeColors["color-primary-transparent-600"] : "white"), borderWidth: 0.5, borderColor: 'black' }}>
        </View>
      ))}
    </View>

  );
};

export default withStyles(ProgressSteps, theme => ({
  lineContainer: {
    backgroundColor: theme['color-primary-100'],
  },
}));
