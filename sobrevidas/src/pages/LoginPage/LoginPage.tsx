import React, {useCallback, useContext, useEffect} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {useForm} from 'react-hook-form';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import Logo from '../../assets/img/Logo';
import {Container, FormContainer, LogoContainer, FormItem} from './Styles';
import {Input, Button} from '@ui-kitten/components';

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
      navigation.navigate('HomePage');
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
              placeholder="Digitar email"
              onChangeText={text => setValue('email', text)}
            />
          </FormItem>
          <FormItem>
            <Input
              secureTextEntry
              placeholder="Inserir senhaaa"
              onChangeText={text => setValue('password', text)}
            />
          </FormItem>

          <Button onPress={handleSubmit(onSubmit)}>Continuar</Button>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;
