import {withStyles} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {Container, TextFooter} from './Styles';

interface Props {
  withFooter?: boolean;
}

export const PageContainer: React.FC<Props> = ({
  children,
  withFooter = false,
  ...props
}) => {
  const {eva, style} = props as any;

  return (
    <Container>
      {children}
      {withFooter && (
        <>
          <View style={[eva.style.awesome, style]}>
            <TextFooter>souu um footeeer</TextFooter>
          </View>
        </>
      )}
    </Container>
  );
};

export default withStyles(PageContainer, theme => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));
