import React from 'react';
import {
  Container,
  ContainerFooter,
  ContainerItem,
  ItemMenuText,
  LineCurrentRoute,
} from './PageContainer.styles';
import {Button, withStyles} from '@ui-kitten/components';
import {home, results, addPerson, personOutline, calendar} from '../icons';
import {useRoute} from '@react-navigation/native';

interface Props {
  withFooter?: boolean;
  navigation?: any;
}

export const PageContainer: React.FC<Props> = ({
  children,
  withFooter = false,
  navigation,
  ...props
}) => {
  const {eva, style} = props as any;

  const currentRoute = useRoute();

  const menuFooter = [
    {
      name: 'HomePage',
      label: 'Home',
      icon: home,
    },
    {
      name: 'CadastrarPacientePage',
      label: 'Paciente',
      icon: addPerson,
    },
    {
      name: 'CadastrarResultadosPage',
      label: 'Resultado',
      icon: results,
    },
    {
      name: 'HistoricoPage',
      label: 'Historico',
      icon: calendar,
    },
    {
      name: 'PerfilUsuarioPage',
      label: 'Perfil',
      icon: personOutline,
    },
  ];

  return (
    <Container>
      {children}
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
