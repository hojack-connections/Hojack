import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignupScreen from '../containers/SignupScreen';
import LoginScreen from '../containers/LoginScreen';
import { Colors, Styles } from '../Themes/';

const AuthStackNavigation = createStackNavigator(
  {
    SignupScreen: { screen: SignupScreen },
    LoginScreen: { screen: LoginScreen },
  },
  {
    header: {
      visible: true,
    },
    initialRouteName: 'SignupScreen',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        display: 'none',
      },
    }),
  }
);

export default AuthStackNavigation;
