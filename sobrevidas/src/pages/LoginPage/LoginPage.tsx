import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';

const LoginPage = () => {
  return (
    <PageContainer>
      <View style={styles.container}>
        <Text>SOU A LOGIN PAGE</Text>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default LoginPage;
