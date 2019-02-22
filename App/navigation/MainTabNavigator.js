import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import normalize from '../helpers/normalizeText';

import EventsStackNavigation from './EventsStackNavigation';
import AttendeesStackNavigation from './AttendeesStackNavigation';
import AddEventStackNavigation from './AddEventStackNavigation';
import ShareStackNavigation from './ShareStackNavigation';
import SubmitStackNavigation from './SubmitStackNavigation';

import { Colors, Styles } from '../Themes/';

const homeTabbarVisible = (navigation) => {
  const { routes } = navigation.state;
  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === 'EventSummaryScreen' ||
      route.routeName === 'EventAttendeesScreen' ||
      route.routeName === 'AttendeeSummaryScreen' ||
      route.routeName === 'AddAttendeeScreen'
    ) {
      return false;
    }
  }
  return true;
};

export default createBottomTabNavigator(
  {
    Events: {
      screen: EventsStackNavigation,
    },
    Attendees: {
      screen: AttendeesStackNavigation,
    },
    Event: {
      screen: AddEventStackNavigation,
    },
    Share: {
      screen: ShareStackNavigation,
    },
    Submit: {
      screen: SubmitStackNavigation,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: homeTabbarVisible(navigation),
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const iconColor = focused ? '#538989' : Colors.black;
        let iconName;
        switch (routeName) {
          case 'Events':
            iconName = 'ticket';
            break;
          case 'Attendees':
            iconName = 'users';
            break;
          case 'Event':
            iconName = 'plus-circle';
            break;
          case 'Share':
            iconName = 'share-square';
            break;
          case 'Submit':
            iconName = 'cogs';
            break;
        }
        return <Icon color={iconColor} name={iconName} size={30} />;
      },
    }),
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#538989',
      inactiveTintColor: Colors.black,
      labelStyle: {
        fontSize: normalize(12),
        paddingBottom: 8,
      },
      style: {
        backgroundColor: Colors.background,
        height: 74,
      },
    },
    initialRouteName: 'Events',
  }
);
