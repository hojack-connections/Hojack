import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import EventsScreen from '../containers/EventsScreen';
import { Colors, Styles } from '../Themes/';


const EventsStackNavigation = StackNavigator({
    EventsScreen: { screen: EventsScreen },
}, {
    header: {
        visible: true,
    },
    initialRouteName: 'EventsScreen',
    navigationOptions: ({ navigation }) => ({
        headerStyle: Styles.nav.header,
    }),
});

// Prevents double taps navigating twice
const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? state : getStateForAction(action, state);
};
EventsStackNavigation.router.getStateForAction = navigateOnce(EventsStackNavigation.router.getStateForAction);

export default EventsStackNavigation;
