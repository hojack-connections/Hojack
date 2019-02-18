import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AddEventScreen from '../containers/AddEventScreen';
import { Colors, Styles } from '../Themes/';


const AddEventStackNavigation = createStackNavigator({
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

export default AddEventStackNavigation;
