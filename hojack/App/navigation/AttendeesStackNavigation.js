import React from 'react';
import { StackNavigator } from 'react-navigation';

import AttendeesScreen from '../containers/AttendeesScreen';
import AttendeeSummaryScreen from '../containers/AttendeeSummaryScreen';

import { Colors, Styles } from '../Themes/';


const AttendeesStackNavigation = StackNavigator({
    AttendeesScreen: { screen: AttendeesScreen },
    AttendeeSummaryScreen: { screen: AttendeeSummaryScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'AttendeesScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

export default AttendeesStackNavigation;
