/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';
import RootNavigation from './navigation/MainTabNavigator';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import { connect } from 'react-redux';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
StatusBar.setBarStyle('light-content', true);

class App extends Component {
  render() {
    const { isLogged } = this.props;
    return (
      <View style={styles.container}>
        {isLogged ? <RootNavigation /> : <AuthStackNavigation />}
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

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

export default connect(
  mapStateToProps,
  null
)(App);
