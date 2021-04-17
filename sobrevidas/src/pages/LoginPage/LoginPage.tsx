import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';

const LoginPage = () => {
  const {userTest} = useContext(UsuarioLogadoContext);
  return (
    <PageContainer>
      <View style={styles.container}>
        <Text>email: {userTest.email}</Text>
        <Text>password: {userTest.password}</Text>
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
