import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AttendeesScreen from '../containers/AttendeesScreen';
import AttendeeSummaryScreen from '../containers/AttendeeSummaryScreen';

import { Colors, Styles } from '../Themes/';

const AttendeesStackNavigation = createStackNavigator(
  {
    AttendeesScreen: { screen: AttendeesScreen },
    AttendeeSummaryScreen: { screen: AttendeeSummaryScreen },
  },
  {
    header: {
      visible: true,
    },
    initialRouteName: 'AttendeesScreen',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.nav.header,
    }),
  }
);

export default AttendeesStackNavigation;
