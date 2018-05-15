import React from 'react';
import { StackNavigator } from 'react-navigation';

import ShareScreen from '../containers/ShareScreen';
import { Colors, Styles } from '../Themes/';


const ShareStackNavigation = StackNavigator({
    ShareScreen: { screen: ShareScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'ShareScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

export default ShareStackNavigation;
