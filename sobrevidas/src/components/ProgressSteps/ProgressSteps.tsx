import React, { useState } from 'react';
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

interface Props {
  size: number,
  step: number
}

export const ProgressSteps: React.FC<Props> = ({
  size, step,
  ...props
}) => {
  const { eva, style } = props as any;
  const [arrSize] = useState(Array<any>(size))
  const currentRoute = useRoute();

  const montarSteps = () => (
    arrSize.map((v, i) => (
      <View>
        <Text>teste</Text>
        <View style={{ flex: 1, backgroundColor: (i < step - 1) ? "grey" : ((i == step - 1) ? eva.style.lineContainer : "black"), borderWidth: 1, borderColor: 'black' }}>

        </View>
      </View>
    ))
  )

  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 10 }}>
      <Text>{arrSize.length}</Text>
      {montarSteps}
    </View>
  );
};

export default withStyles(ProgressSteps, theme => ({
  lineContainer: {
    backgroundColor: theme['color-primary-500'],
  },
}));
