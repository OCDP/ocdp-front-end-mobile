import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
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
} from './LoginPage.styles';
import {Input, Icon} from '@ui-kitten/components';
import {useLoginUsuario} from '../../hooks/networking/usuario';
import UsuarioLogadoContext from '../../contexts/UsuarioLogadoContext';
import primariaColors from '../../themes/primariaColors.json';
import secundariaColors from '../../themes/secundariaColors.json';
import {version} from '../../utils/constants';
import {personOutline} from '../../components/icons';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import MaskedInput from '../../components/MaskedInput/MaskedInput';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {WaveContainer} from '../../styles/index.styles';

const LoginPage = ({navigation}: any) => {
  const {register, setValue, handleSubmit} = useForm();
  const loginUsuario = useLoginUsuario();
  const {setUsuarioLogado, setThemeColors} = useContext(UsuarioLogadoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    register('cpf');
    register('password');
  }, [register]);

  const login = useCallback(
    async (values: Models.Login) => {
      try {
        setLoading(true);
        const {data} = await loginUsuario(values.cpf, values.password);
        setUsuarioLogado({...data, senhaUsuario: values.password});
        if (data.nivelAtencao === 'PRIMARIA') {
          setThemeColors(primariaColors);
        } else {
          setThemeColors(secundariaColors);
        }
        setLoading(false);
        navigation.navigate('HomePage');
      } catch (e) {
        setLoading(false);
        Alert.alert('Erro no login', 'Algo deu errado no momento do login', [
          {text: 'Voltar'},
        ]);
      }
    },
    [loginUsuario, navigation, setThemeColors, setUsuarioLogado],
  );

  return (
    <PageContainer>
      <Container>
        <WaveContainer level="3" />
        <FormContainer>
          <LogoContainer>
            <Logo size={100} />
          </LogoContainer>
          <KeyboardAvoidingView>
            <FormItem>
              <MaskedInput
                accessoryRight={personOutline}
                maxLength={14}
                keyboardType="number-pad"
                placeholder="Digitar seu CPF"
                label={'CPF'}
                mask="cpf"
                inputMaskChange={value => {
                  if (value.length < 15) {
                    setValue('cpf', value);
                  }
                }}
              />
            </FormItem>
            <FormItem>
              <Input
                label="Senha"
                appearance="default"
                accessoryRight={(propsIcon: any) => (
                  <Icon {...propsIcon} name="eye-off" />
                )}
                secureTextEntry
                placeholder="Digite sua senha"
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
          </KeyboardAvoidingView>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default memo(LoginPage);
