import React, { Component } from 'react';
import { View } from 'react-native';
import ActivityOpenOrder from '../ActivityOpenOrder';

import styles from './styles';

class Activity extends Component {
  static navigationOptions = {
    title: 'Activity',
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

  static displayName = 'Activity';

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityOpenOrder />
      </View>
    );
  }
}

export default Activity;
