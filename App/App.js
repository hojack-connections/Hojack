/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';
import RootNavigation from './navigation/MainTabNavigator';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import { inject, observer } from 'mobx-react';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
StatusBar.setBarStyle('light-content', true);

export default
@inject('auth')
@observer
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.auth.authenticated ? (
          <RootNavigation />
        ) : (
          <AuthStackNavigation />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
