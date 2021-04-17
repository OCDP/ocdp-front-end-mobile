import React from 'react';
import {View, StyleSheet} from 'react-native';

const PageContainer = ({children}: any) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default PageContainer;
