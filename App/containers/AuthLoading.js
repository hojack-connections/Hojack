import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default
@inject('auth')
@observer
class AuthLoading extends React.Component {
  componentDidMount() {
    this.props.auth.onInitialLoad(this.updateNavigation);
  }

  updateNavigation = () => {
    if (this.props.auth.authenticated) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return <View />;
  }
}
