import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import normalize from '../helpers/normalizeText';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Cell extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.children}
        {this.props.arrow ? (
          <Icon
            color={'#797979'}
            name="chevron-right"
            size={16}
            style={styles.arrow}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    height: 46,
  },
  label: {
    fontSize: normalize(16),
    fontWeight: '700',
    width: 210,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 14,
  },
});
