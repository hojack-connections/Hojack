/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import RootNavigation from './navigation/MainTabNavigator';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
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

export default App;
