import React from 'react';
import Logo from '../../assets/img/Logo';
import {View, StyleSheet, Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Card, Image} from 'react-native-elements';

const BemVindoPage = ({navigation}: any) => {
  const users = [
    {
      name: 'braz',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
    {
      name: 'wev',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    },
  ];

  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={styles.textHeader}>
          <Text>APP - Sobre Vida 1.0</Text>
        </View>
        <View style={styles.containerLogo}>
          <Logo size={200} />
          <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Card.Divider />
            {users.map((u, i) => {
              return (
                <View key={i}>
                  <Image resizeMode="cover" source={{uri: u.avatar}} />
                  <Text>{u.name}</Text>
                </View>
              );
            })}
          </Card>
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
