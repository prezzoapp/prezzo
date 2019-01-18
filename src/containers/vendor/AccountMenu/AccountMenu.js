// @flow
import * as React from 'react';
import { Image, View, Alert, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons } from '../../../components/VectorIcons';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import styles from './styles';
import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  COLOR_BLACK
} from '../../../services/constants';

export default class AccountMenu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('70%'),
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        Vendor Account
      </Text>
    ),
    headerTitleStyle: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: wp('6.4%')
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    }
  });

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    avatarURL: PropTypes.string.isRequired,
    vendor: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    userLogout: PropTypes.func.isRequired
  };

  async logout() {
    try {
      await this.props.userLogout();
      await snapshot.clearSnapshot();
    } catch(e) {
      console.log("Logout Error!");
    }
  }

  createMenu(vendor, menu) {
    if(vendor) {
      this.props.navigate({ routeName: 'CreateMenu' });
    } else {
      Alert.alert(
        '',
        'You must create a Vendor account before creating a menu.',
        [{ text: 'OK' }],
        { cancelable: false }
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
                this.props.navigate({ routeName: 'CustomerProfileNavigator' })
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
