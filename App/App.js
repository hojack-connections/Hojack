/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';
import RootNavigation from './navigation/MainTabNavigator';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import { inject, Provider } from 'mobx-react';
import AttendeeStore from './store/attendee';
import AuthStore from './store/auth';
import EventStore from './store/event';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
StatusBar.setBarStyle('light-content', true);

const stores = {
  attendee: new AttendeeStore(),
  auth: new AuthStore(),
  event: new EventStore(),
};

export default
@inject('auth')
class App extends Component {
  render() {
    console.log(this.props.auth);
    return (
      <Provider {...stores}>
        <View style={styles.container}>
          {false ? <RootNavigation /> : <AuthStackNavigation />}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
