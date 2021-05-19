import React, {useContext, useMemo} from 'react';
import {withStyles} from '@ui-kitten/components';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import {ProgressBar} from '@react-native-community/progress-bar-android';

interface Props {
  size: number;
  step: number;
}

export const ProgressSteps: React.FC<Props> = ({size, step}) => {
  const {themeColors} = useContext(UsuarioLogadoContext);

  const percent = useMemo(() => (((step / size) * 100) / 100).toFixed(2), [
    size,
    step,
  ]);

  return (
    <ProgressBar
      styleAttr="Horizontal"
      progress={+percent}
      indeterminate={false}
      color={themeColors['color-primary-500']}
    />
  );
};

export default withStyles(ProgressSteps, theme => ({
  lineContainer: {
    backgroundColor: theme['color-primary-100'],
  },
}));
