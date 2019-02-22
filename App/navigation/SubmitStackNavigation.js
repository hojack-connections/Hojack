import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SubmitScreen from '../containers/SubmitScreen';
import SubmitSettingsScreen from '../containers/SubmitSettingsScreen';
import { Colors, Styles } from '../Themes/';

const SubmitStackNavigation = createStackNavigator(
  {
    SubmitSettingsScreen: { screen: SubmitSettingsScreen },
  },
  {
    header: {
      visible: true,
    },
    initialRouteName: 'SubmitSettingsScreen',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.nav.header,
    }),
  }
);

export default SubmitStackNavigation;
