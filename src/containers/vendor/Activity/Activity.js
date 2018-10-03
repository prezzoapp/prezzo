import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { Feather } from '../../../components/VectorIcons';

export default class Activity extends Component {
  static displayName = 'Activity';

  static navigationOptions = {
    title: 'Activity',
    tabBarIcon: props => (
      <Feather name="bell" size={24} color={props.tintColor} />
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

  render() {
    return <View style={styles.container} />;
  }
}
