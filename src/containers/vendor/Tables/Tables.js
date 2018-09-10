// @flow
import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import TableScreenHeader from '../TableScreenHeader'; 
import { MaterialIcons } from '@expo/vector-icons';

class Tables extends Component {
  static displayName = 'Tables';

  static navigationOptions = {
    title: 'Tables',
    tabBarIcon: props => (
      <MaterialIcons name='book' size={24} color={props.tintColor} />
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
      <View style={styles.container}>
      <TableScreenHeader />
      </View>
    );
  }
}

export default Tables;
