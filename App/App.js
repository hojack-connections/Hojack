/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import RootNavigation from './navigation/MainTabNavigator';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import { connect } from 'react-redux';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
StatusBar.setBarStyle('light-content', true);

type Props = {
  isLogged: PropTypes.bool,
};
class App extends Component<Props> {
  render() {
    const { isLogged } = this.props;
    return (
      <View style={styles.container}>
        {
          isLogged ? <RootNavigation /> : <AuthStackNavigation />
        }       
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

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps, null)(App);
