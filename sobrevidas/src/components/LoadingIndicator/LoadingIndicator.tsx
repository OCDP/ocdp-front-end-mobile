import {Spinner} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ImageProps} from 'react-native-svg';

const LoadingIndicator: RenderProp<Partial<ImageProps>> = (props: any) => {
  const styles = StyleSheet.create({
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );
};

export default LoadingIndicator;
