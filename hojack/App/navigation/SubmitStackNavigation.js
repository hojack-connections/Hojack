import React from 'react';
import { StackNavigator } from 'react-navigation';

import SubmitScreen from '../containers/SubmitScreen';
import { Colors, Styles } from '../Themes/';


const SubmitStackNavigation = StackNavigator({
    SubmitScreen: { screen: SubmitScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'SubmitScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

export default SubmitStackNavigation;
