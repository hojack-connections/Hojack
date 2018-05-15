import React from 'react';
import { Platform, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import normalize from '../helpers/normalizeText';

import EventsStackNavigation from './EventsStackNavigation';
import AttendeesStackNavigation from './AttendeesStackNavigation';
import EventStackNavigation from './EventStackNavigation';
import ShareStackNavigation from './ShareStackNavigation';
import SubmitStackNavigation from './SubmitStackNavigation';

import { Colors, Styles } from '../Themes/';


export default TabNavigator(
    {
        Events: {
            screen: EventsStackNavigation,
        },
        Attendees: {
            screen: AttendeesStackNavigation,
        },
        Event: {
            screen: EventStackNavigation,
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
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName, iconColor;
                iconColor = focused ? '#538989' : Colors.black;
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
                return (
                    <Icon name={iconName} size={30} color={iconColor} />
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
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
                height: 75,
            }
        },
        initialRouteName: 'Events'
    }
);
