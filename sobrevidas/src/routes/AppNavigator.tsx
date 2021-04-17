import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import BemVindoPage from '../pages/BemVindoPage/BemVindoPage';
import LoginPage from '../pages/LoginPage/LoginPage';

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="BemVindoPage">
        <Drawer.Screen name="BemVindoPage" component={BemVindoPage} />
        <Drawer.Screen name="LoginPage" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
