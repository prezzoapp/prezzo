// @flow
import * as React from 'react';
import { Image, View, Alert, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import styles from './styles';

export default class AccountMenu extends React.Component {
  static navigationOptions = {
    tabBarIcon: props => (
      <Icon name="person-outline" size={24} color={props.tintColor} />
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

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    createMenu: PropTypes.func.isRequired
  };

  async logout() {
    await snapshot.clearSnapshot();
    this.props.userLogout();
    this.props.navigate({ routeName: 'Authentication' });
  }

  createMenu(vendor, menu) {
    if(vendor) {
      if (!menu) this.props.createMenu();

      this.props.navigate({ routeName: 'CreateMenu' });
    } else {
      Alert.alert(
        '',
        'You must create a Vendor account before creating a menu.',
        [{ text: 'OK' }],
        {cancelable: false}
      )
    }
  }

  render() {
    const { avatarURL, vendor, menu } = this.props;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar}
                source={
                  avatarURL
                    ? { uri: avatarURL }
                    : require('../../../../assets/images/etc/default-avatar.png')
                }
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() =>
                this.props.navigate({ routeName: 'VendorAccountInfo' })
              }
              title={`${vendor ? 'Update' : 'Create'} Vendor Profile`}
              icon="add"
            />
            <MenuButton
              onPress={() => this.createMenu(vendor, menu)}
              title={`${menu ? 'Update' : 'Create'} Menu`}
              icon="add"
            />
            <MenuButton onPress={() => {}} title="Accept Payments" icon="add" />
            <MenuButton
              onPress={() =>
                this.props.navigate({ routeName: 'CustomerProfile' })
              }
              title="Switch to User Account"
              icon="repeat"
            />
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => this.props.navigate('')}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerText}>Help</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logout()}>
              <View style={styles.footerRight}>
                <Text style={styles.footerText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
