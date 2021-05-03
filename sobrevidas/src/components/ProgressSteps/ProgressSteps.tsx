import React, { useContext, useState } from 'react';
import {
  Container, Bar, SubContainer
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
    <Container flexInfo={flexInfo}>
      <SubContainer>
        {arrSize.map((v, i) => (
          <Bar indice={i} step={step} colorVar={themeColors["color-primary-500"]}>
          </Bar>
        ))}
      </SubContainer>
    </Container>

  );
};

export default withStyles(ProgressSteps, theme => ({
  lineContainer: {
    backgroundColor: theme['color-primary-100'],
  },
}));
