import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignupScreen from '../containers/SignupScreen';
import LoginScreen from '../containers/LoginScreen';

const AuthStackNavigation = createStackNavigator(
  {
    SignupScreen: { screen: SignupScreen },
    LoginScreen: { screen: LoginScreen },
  },
  {
    initialRouteName: 'SignupScreen',
    defaultNavigationOptions: {
      headerStyle: {
        display: 'none',
      },
    },
  }
);

export default AuthStackNavigation;
