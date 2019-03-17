import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import AuthLoading from './containers/AuthLoading';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
StatusBar.setBarStyle('light-content', true);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    AuthLoading,
    Auth: AuthStackNavigation,
    App: RootNavigation,
  })
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
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
