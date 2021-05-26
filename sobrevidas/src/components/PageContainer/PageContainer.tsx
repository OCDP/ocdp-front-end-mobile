import React from 'react';
import {
  Container,
  HeaderContainer,
  ChildContain,
  TextPageTitle,
  HeaderItem,
} from './PageContainer.styles';
import {Button} from '@ui-kitten/components';
import {minimalBack, settings} from '../icons';

interface Props {
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
  navigation,
}) => {
  return (
    <Container>
      {withHeader && (
        <HeaderContainer level="4">
          {canGoBack ? (
            <HeaderItem>
              <Button
                appearance="ghost"
                size="medium"
                accessoryRight={minimalBack}
                onPress={() => navigation.goBack()}
              />
            </HeaderItem>
          ) : (
            <HeaderItem />
          )}
          <HeaderItem>
            <TextPageTitle category="c3">{pageTitle}</TextPageTitle>
          </HeaderItem>
          <HeaderItem>
            <Button
              onPress={() => navigation.navigate('PerfilUsuarioPage')}
              appearance="ghost"
              size="medium"
              accessoryRight={settings}
            />
          </HeaderItem>
        </HeaderContainer>
      )}
      <ChildContain>{children}</ChildContain>
    </Container>
  );
};

export default PageContainer;
