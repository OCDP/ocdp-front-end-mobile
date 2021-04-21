import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from './routes';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 0,
  },
} as any;

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="BemVindoPage">
        {routes.map((page, i) => (
          <Stack.Screen
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
            key={i}
            name={page.name}
            component={page.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
