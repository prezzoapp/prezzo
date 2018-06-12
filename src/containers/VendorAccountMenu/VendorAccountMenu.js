// @flow
import * as React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class VendorAccountMenu extends React.Component {
  static displayName = 'Explore';

  static navigationOptions = {
    title: 'Vendor',
    tabBarIcon: props => (
        <Icon name='home' size={24} color={props.tintColor} />
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
    return (
      <View style={styles.container} />
    );
  }
}
