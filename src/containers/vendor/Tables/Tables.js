// @flow
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Tables extends Component {
  static displayName = 'Tables';

  static navigationOptions = {
    title: 'Tables',
    tabBarIcon: props => (
      <Icon name='book' size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    }
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  }
});

export default Tables;