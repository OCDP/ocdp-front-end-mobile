import {withStyles} from '@ui-kitten/components';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
  loading: boolean;
}
const FadeLoading: React.FC<Props> = ({loading, ...props}) => {
  const {eva} = props as any;

  return (
    <Spinner
      color={eva.style.primary}
      visible={loading}
      animation="fade"
      overlayColor={eva.style.fadeBackground}
    />
  );
};

export default withStyles(FadeLoading, theme => ({
  primary: theme['color-primary-500'],
  fadeBackground: theme['color-primary-transparent-200'],
}));
