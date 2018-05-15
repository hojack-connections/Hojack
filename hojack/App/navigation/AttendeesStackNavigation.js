import React from 'react';
import { StackNavigator } from 'react-navigation';

import AttendeesScreen from '../containers/AttendeesScreen';
import { Colors, Styles } from '../Themes/';


const AttendeesStackNavigation = StackNavigator({
    AttendeesScreen: { screen: AttendeesScreen },
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
