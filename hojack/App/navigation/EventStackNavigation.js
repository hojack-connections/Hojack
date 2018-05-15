import React from 'react';
import { StackNavigator } from 'react-navigation';

import EventScreen from '../containers/EventScreen';
import { Colors, Styles } from '../Themes/';


const EventStackNavigation = StackNavigator({
    EventScreen: { screen: EventScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'EventScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

export default EventStackNavigation;
