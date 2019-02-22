import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import MainTabNavigator from './MainTabNavigator';

const RootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {},
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
