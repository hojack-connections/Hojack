import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import normalize from '../helpers/normalizeText';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Cell extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <TouchableWithoutFeedback onPress={this.props.onPress || (() => {})}>
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
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    height: 46,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    fontSize: normalize(16),
    fontWeight: '700',
    marginRight: 40,
    minWidth: 100,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 14,
  },
});
