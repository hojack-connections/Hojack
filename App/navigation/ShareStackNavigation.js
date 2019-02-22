import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ShareScreen from '../containers/ShareScreen';
import { Colors, Styles } from '../Themes/';

const ShareStackNavigation = createStackNavigator(
  {
    ShareScreen: { screen: ShareScreen },
  },
  {
    header: {
      visible: true,
    },
    initialRouteName: 'ShareScreen',
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.nav.header,
    }),
  }
);

export default ShareStackNavigation;
