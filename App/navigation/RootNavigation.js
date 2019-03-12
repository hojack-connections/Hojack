import { createStackNavigator } from 'react-navigation';
import Colors from '../Themes/Colors';

import EventsScreen from '../containers/EventsScreen';
import AddEventScreen from '../containers/AddEventScreen';

export default createStackNavigator(
  {
    Home: {
      screen: EventsScreen,
    },
    // EventSummaryScreen: { screen: EventSummaryScreen },
    // EventAttendeesScreen: { screen: EventAttendeesScreen },
    // AttendeeSummaryScreen: { screen: AttendeeSummaryScreen },
    // AddAttendeeScreen: { screen: AddAttendeeScreen },
    AddEventScreen: { screen: AddEventScreen },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigation,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: Colors.white,
        fontSize: 17,
      },
      headerTintColor: 'white',
    },
  }
);
