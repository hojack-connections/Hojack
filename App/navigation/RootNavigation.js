import { createStackNavigator } from 'react-navigation';
import Colors from '../Themes/Colors';

import EventsScreen from '../containers/EventsScreen';
import AddEventScreen from '../containers/AddEventScreen';
import AccountScreen from '../containers/AccountScreen';
import EventSummaryScreen from '../containers/EventSummaryScreen';
import EventAttendeesScreen from '../containers/EventAttendeesScreen';
import AddAttendeeScreen from '../containers/AddAttendeeScreen';
import EventDetailScreen from '../containers/EventDetailScreen';
import StartTrial from '../containers/StartTrial';
import PurchaseSubscription from '../containers/PurchaseSubscription';
import RenewSubscription from '../containers/RenewSubscription';
import AttendeeDetail from '../containers/AttendeeDetail';
import AttendeeEdit from '../containers/AttendeeEdit';

import { fromBottom } from 'react-navigation-transitions';

const handleCustomTransition = ({ scenes }) => {
  // const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  if (
    nextScene.route.routeName === 'StartTrial' ||
    nextScene.route.routeName === 'PurchaseSubscription' ||
    nextScene.route.routeName === 'RenewSubscription' ||
    nextScene.route.routeName === 'AccountScreen'
  ) {
    return fromBottom();
  }
  // otherwise do default transition
};

export default createStackNavigator(
  {
    Home: { screen: EventsScreen },
    EventSummaryScreen: { screen: EventSummaryScreen },
    EventAttendeesScreen: { screen: EventAttendeesScreen },
    // AttendeeSummaryScreen: { screen: AttendeeSummaryScreen },
    AddAttendeeScreen: { screen: AddAttendeeScreen },
    AddEventScreen: { screen: AddEventScreen },
    AccountScreen: { screen: AccountScreen },
    EventDetailScreen: { screen: EventDetailScreen },
    StartTrial: { screen: StartTrial },
    PurchaseSubscription: { screen: PurchaseSubscription },
    RenewSubscription: { screen: RenewSubscription },
    AttendeeDetail: { screen: AttendeeDetail },
    AttendeeEdit: { screen: AttendeeEdit },
  },
  {
    initialRouteName: 'Home',
    transitionConfig: (nav) => handleCustomTransition(nav),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigation,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
      },
      headerTitleStyle: {
        color: Colors.black,
        fontSize: 17,
      },
      headerTintColor: Colors.purple,
    },
  }
);
