import React, {useCallback, useContext, useEffect, useState} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {useForm} from 'react-hook-form';
import Logo from '../../assets/img/Logo';
import {
  Container,
  FormContainer,
  LogoContainer,
  FormItem,
  VersionText,
  ButtonLogin,
  FooterLogin,
  WaveContainer,
} from './LoginPage.styles';
import {Input, Icon, Spinner} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useLoginUsuario} from '../../hooks/networking/usuario';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import primariaColors from '../../themes/primariaColors.json';
import secundariaColors from '../../themes/secundariaColors.json';
import {version} from '../../utils/constants';
import {StyleSheet, View} from 'react-native';
import {person} from '../../components/icons';
import AppContext from '../../contexts/AppContext';

const LoginPage = ({navigation}: any) => {
  const {register, setValue, handleSubmit} = useForm();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const loginUsuario = useLoginUsuario();
  const {setUsuarioLogado, setThemeColors} = useContext(UsuarioLogadoContext);
  const [loading, setLoading] = useState(false);
  const {setModal} = useContext(AppContext);

  useEffect(() => {
    register('cpf');
    register('password');
  }, [register]);

  const login = useCallback(
    async (values: Models.Login) => {
      try {
        setLoading(true);
        const {data} = await loginUsuario(values.cpf, values.password);
        console.log(data);
        setUsuarioLogado({...data, senhaUsuario: values.password});
        if (data.nivelAtencao === 'PRIMARIA') {
          setThemeColors(primariaColors);
        } else {
          setThemeColors(secundariaColors);
        }
        setLoading(false);
        navigation.navigate('HomePage');
      } catch (e) {
        setModal({
          visible: true,
          title: 'Erro no login',
          type: 'error',
          content:
            'Alguma coisa deu errado no login, verifique seus dados e tente novamente',
        });
        setLoading(false);
      }
    },
    [loginUsuario, navigation, setModal, setThemeColors, setUsuarioLogado],
  );

  const renderIcon = (propsIcon: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...propsIcon} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const LoadingIndicator = (props: any) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const styles = StyleSheet.create({
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <PageContainer>
      <Container>
        <WaveContainer level="2" />
        <FormContainer>
          <LogoContainer>
            <Logo size={180} />
          </LogoContainer>
          <FormItem>
            <Input
              label="CPF"
              appearance="default"
              accessoryRight={person}
              placeholder="Digitar CPF"
              onChangeText={text => setValue('cpf', text)}
            />
          </FormItem>
          <FormItem>
            <Input
              label="Senha"
              appearance="default"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              placeholder="Inserir senha"
              onChangeText={text => setValue('password', text)}
            />
          </FormItem>
          <FooterLogin>
            <FormItem>
              <ButtonLogin
                appearance="outline"
                accessoryRight={loading ? LoadingIndicator : undefined}
                onPress={handleSubmit(login)}>
                {loading ? '' : 'Login'}
              </ButtonLogin>
            </FormItem>
            <VersionText category="c1">v{version}</VersionText>
          </FooterLogin>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;
