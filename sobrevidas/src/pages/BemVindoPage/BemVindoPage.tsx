import React from 'react';
import Logo from '../../assets/img/Logo';
import {View, StyleSheet, Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';

const BemVindoPage = ({navigation}: any) => {
  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={styles.textHeader}>
          <Text>APP - Sobre Vida 1.0</Text>
        </View>
        <View style={styles.containerLogo}>
          <Logo size={200} />
          <View style={styles.textHeader}>
            <Text>
              Rastreamento e Monitoramento do Grupo de Risco ao Câncer de Boca
            </Text>
          </View>
        </View>
        <View style={styles.containerFooter}>
          <View>
            <Text
              style={styles.buttonFooter}
              onPress={() => navigation.navigate('LoginPage')}>
              fazer login
            </Text>
          </View>
        </View>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    top: 36,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerLogo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFooter: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonFooter: {
    bottom: 36,
    width: '100%',
  },
});

export default BemVindoPage;
