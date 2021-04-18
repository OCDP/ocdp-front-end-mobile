import React, {useCallback, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import PageContainer from '../../components/PageContainer/PageContainer';
import {Button, Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import Logo from '../../assets/img/Logo';
import {Container, FormContainer, LogoContainer, FormItem} from './Styles';

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
            <Text>Email</Text>
            <TextInput
              onChangeText={text => setValue('email', text)}
              placeholder="Inserir email"
            />
          </FormItem>
          <FormItem>
            <Text>Senha</Text>
            <Input
              placeholder="Inserir senha"
              secureTextEntry={true}
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
