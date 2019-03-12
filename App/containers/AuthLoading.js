import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

export default
@inject('auth')
@observer
class AuthLoading extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.authenticated === prevProps.auth.authenticated) {
      return;
    }
    this.updateNavigation();
  }

  componentDidMount() {
    this.updateNavigation();
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
