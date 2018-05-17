import React from 'react';
import { StackNavigator } from 'react-navigation';

import AddEventScreen from '../containers/AddEventScreen';
import { Colors, Styles } from '../Themes/';


const EventStackNavigation = StackNavigator({
    AddEventScreen: { screen: AddEventScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'AddEventScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

export default EventStackNavigation;
