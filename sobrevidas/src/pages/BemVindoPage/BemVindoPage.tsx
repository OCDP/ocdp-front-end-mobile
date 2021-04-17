import React, {useCallback, useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Button, Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import Logo from '../../assets/img/Logo';

const BemVindoPage = ({navigation}: any) => {
  const {register, setValue, handleSubmit} = useForm();
  const {setUserTest} = useContext(UsuarioLogadoContext);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = useCallback(
    (values: Models.Login) => {
      setUserTest(values);
      navigation.navigate('LoginPage');
    },
    [navigation, setUserTest],
  );

  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logo}>
            <Logo size={180} />
          </View>
          <View style={styles.formItem}>
            <Text>Email</Text>
            <TextInput
              onChangeText={text => setValue('email', text)}
              placeholder="Inserir email"
            />
          </View>
          <View style={styles.formItem}>
            <Text>Senha</Text>
            <Input
              placeholder="Inserir senha"
              secureTextEntry={true}
              onChangeText={text => setValue('password', text)}
            />
          </View>

          <Button onPress={handleSubmit(onSubmit)} title="Continuar" />
        </View>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  formContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ccc',
    borderRadius: 10,
    width: 300,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default BemVindoPage;
