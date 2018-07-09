// @flow
import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../components/MenuButton';
import * as snapshot from '../../utils/snapshot';
import styles from './styles';

export default class VendorAccountMenu extends React.Component {
  static displayName = 'Profile';

  static navigationOptions = {
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
    ),
    headerStyle: {
      position: 'absolute',
      backgroundColor: '#2B2C2C',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    title: 'Vendor Account'
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  async logout() {
    await snapshot.clearSnapshot();
    this.props.navigate({routeName: 'Unauthenticated'});
  }

  navigateToVendorAccountInfo() {
    this.props.navigate({routeName: 'VendorAccountInfo'});
  }

  render() {
    const {avatarURL, vendor} = this.props;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar}
                source={
                  avatarURL
                  ? {uri: avatarURL}
                  : require('../../../assets/images/etc/default-avatar.png')}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() => this.navigateToVendorAccountInfo()}
              title={`${vendor ? 'Update' : 'Create'} Vendor Profile`}
              icon='add'
            />
            <MenuButton
              onPress={() => this.props.navigate(null)}
              title='Create Menu'
              icon='add'
            />
            <MenuButton
              onPress={() => this.props.navigate(null)}
              title='Accept Payments'
              icon='add'
            />
          </View>
        </View>
      </View>
    );
  }
}
