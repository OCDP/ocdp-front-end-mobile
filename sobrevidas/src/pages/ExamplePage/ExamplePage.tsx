import React, {useCallback, useEffect, useState} from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import {useForm} from 'react-hook-form';
import Logo from '../../assets/img/Logo';
import {
  Container,
  FormContainer,
  LogoContainer,
  FormItem,
} from './ExamplePage.styles';
import {Input, Button, Icon, withStyles} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {person} from '../../components/icons';

const ExamplePage = ({navigation, ...props}: any) => {
  const {register, setValue, handleSubmit} = useForm();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {eva, style} = props as any;

  useEffect(() => {
    register('cpf');
    register('password');
  }, [register]);

  const onSubmit = useCallback(
    (values: Models.Login) => {
      console.log(values);
      navigation.navigate('HomePage');
    },
    [navigation],
  );

  const renderIcon = (propsIcon: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...propsIcon} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <PageContainer withFooter>
      <Container>
        <FormContainer style={[eva.style.container, style]}>
          <LogoContainer>
            <Logo size={180} />
          </LogoContainer>
          <FormItem>
            <Input
              appearance="default"
              accessoryRight={person}
              label="CPF"
              placeholder="Digitar email"
              onChangeText={text => setValue('cpf', text)}
            />
          </FormItem>
          <FormItem>
            <Input
              appearance="default"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              placeholder="Inserir senha"
              onChangeText={text => setValue('password', text)}
            />
          </FormItem>
          <FormItem>
            <Button onPress={handleSubmit(onSubmit)}>Continuar</Button>
          </FormItem>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default withStyles(ExamplePage, theme => ({
  container: {
    backgroundColor: theme['color-primary-100'],
  },
}));
