import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import EventsScreen from '../containers/EventsScreen';
import EventSummaryScreen from '../containers/EventSummaryScreen';
import EventAttendeesScreen from '../containers/EventAttendeesScreen';
import AttendeeSummaryScreen from '../containers/AttendeeSummaryScreen';
import AddAttendeeScreen from '../containers/AddAttendeeScreen';

import { Colors, Styles } from '../Themes/';

const EventsStackNavigation = StackNavigator({
    EventsScreen: { screen: EventsScreen },
    EventSummaryScreen: { screen: EventSummaryScreen },
    EventAttendeesScreen: { screen: EventAttendeesScreen },
    AttendeeSummaryScreen: { screen: AttendeeSummaryScreen },
    AddAttendeeScreen: { screen: AddAttendeeScreen },
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
