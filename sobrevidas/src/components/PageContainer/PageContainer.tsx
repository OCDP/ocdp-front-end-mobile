import React from 'react';
import {
  Container,
  ContainerFooter,
  ContainerItem,
  ItemMenuText,
  LineCurrentRoute,
  HeaderContainer,
  ChildContain,
  TextPageTitle,
} from './PageContainer.styles';
import {Button, withStyles} from '@ui-kitten/components';
import {personOutline, calendar, minimalBack, settings} from '../icons';
import {useRoute} from '@react-navigation/native';

interface Props {
  withFooter?: boolean;
  withHeader?: boolean;
  canGoBack?: boolean;
  pageTitle?: string;
  navigation?: any;
}

export const PageContainer: React.FC<Props> = ({
  withHeader = false,
  canGoBack = false,
  pageTitle,
  children,
  withFooter = false,
  navigation,
  ...props
}) => {
  const {eva, style} = props as any;

  const currentRoute = useRoute();

  const menuFooter = [
    {
      name: 'DadosPacientePage',
      label: 'Paciente',
      icon: personOutline,
    },
    {
      name: 'HistoricoPage',
      label: 'Historico',
      icon: calendar,
    },
  ];

  return (
    <Container>
      {withHeader && (
        <HeaderContainer level="4">
          {canGoBack ? (
            <Button
              appearance="ghost"
              size="medium"
              accessoryRight={minimalBack}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <></>
          )}
          <TextPageTitle category="h6">{pageTitle}</TextPageTitle>
          <Button
            appearance="outline"
            size="medium"
            accessoryRight={personOutline}
            onPress={() => navigation.navigate('CadastrarPacientePage')}
          />
          <Button
            onPress={() => navigation.navigate('PerfilUsuarioPage')}
            appearance="ghost"
            size="medium"
            accessoryRight={settings}
          />
        </HeaderContainer>
      )}
      <ChildContain>{children}</ChildContain>
      {withFooter && (
        <>
          <ContainerFooter>
            {menuFooter.map((page, i) => (
              <ContainerItem key={i}>
                <Button
                  appearance="ghost"
                  size="large"
                  accessoryRight={page.icon}
                  onPress={() =>
                    page.name !== currentRoute.name
                      ? navigation.navigate(page.name)
                      : undefined
                  }
                />
                {page.name !== currentRoute.name ? (
                  <ItemMenuText appearance="hint" category="c1">
                    {page.label}
                  </ItemMenuText>
                ) : (
                  <LineCurrentRoute style={[eva.style.lineContainer, style]} />
                )}
              </ContainerItem>
            ))}
          </ContainerFooter>
        </>
      )}
    </Container>
  );
};

export default withStyles(PageContainer, theme => ({
  lineContainer: {
    backgroundColor: theme['color-primary-500'],
  },
}));
