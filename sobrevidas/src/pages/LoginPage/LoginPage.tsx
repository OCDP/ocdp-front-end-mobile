import React, {useCallback, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Button, Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import Logo from '../../assets/img/Logo';
import {Container, FormContainer, LogoContainer, FormItem} from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginPage = ({navigation}: any) => {
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
      <Container>
        <FormContainer>
          <LogoContainer>
            <Logo size={180} />
          </LogoContainer>
          <FormItem>
            <Input
              inputContainerStyle={{}}
              errorMessage="E-mail nao informado."
              label="E-mail"
              leftIcon={<Icon name="email" size={20} />}
              placeholder="Inserir e-mail"
              onChangeText={text => setValue('email', text)}
            />
          </FormItem>
          <FormItem>
            <Input
              inputContainerStyle={{}}
              errorMessage="Senha nao informada."
              label="Senha"
              secureTextEntry
              leftIcon={<Icon name="account-outline" size={20} />}
              placeholder="Inserir senha"
              onChangeText={text => setValue('password', text)}
            />
          </FormItem>

          <Button onPress={handleSubmit(onSubmit)} title="Continuar" />
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;
