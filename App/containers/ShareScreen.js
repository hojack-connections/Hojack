import React, { Component } from 'react';
import { View } from 'react-native';

import { Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';

export default
@inject()
@observer
class ShareScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Share',
    headerTitleStyle: Styles.nav.title,
    headerBackTitle: 'Back',
  });

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.subContainer} />
      </View>
    );
  }
}
