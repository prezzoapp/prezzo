// @flow
import * as React from 'react';
import { View, Alert, TouchableOpacity, Text, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import MenuButton from '../../../components/MenuButton';
import showGenericAlert from '../../../components/GenericAlert';
import * as snapshot from '../../../utils/snapshot';
import LoadingComponent from '../../../components/LoadingComponent';
import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';
import CacheImage from '../../../components/CacheImage';
import styles from './styles';
import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  COLOR_BLACK
} from '../../../services/constants';

let disableBtn = false;

export default class AccountMenu extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Text
        style={{
          flex: 1,
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}>Vendor Account
      </Text>
    ),
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTintColor: '#fff'
  };

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    avatarURL: PropTypes.string.isRequired,
    vendor: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    userLogout: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired
  };

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
  }

  logout = () => {
    showGenericAlert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Yes', onPress: async () => {
          if(disableBtn === false) {
            disableBtn = true;
            try {
              await this.props.userLogout(true);
              await snapshot.clearSnapshot();
              disableBtn = false;
            } catch(err) {
              if(err.code === 401) {
                manuallyLogout(err, () => this.props.userLogout());
              } else {
                showAlertWithMessage('Uh-oh!', err, () => {
                  disableBtn = false;
                });
              }
            }
          }
        }},
        { text: 'No', onPress: () => null }
      ]
    );
  };

  createMenu(vendor, menu) {
    if(disableBtn === false) {
      disableBtn = true;
      if(vendor) {
        this.props.navigate({ routeName: 'CreateMenu' });
        this.enableBtns();
      } else {
        Alert.alert(
          '',
          'You must create a Vendor account before creating a menu.',
          [{
            text: 'OK',
            onPress: () => {
              disableBtn = false
          }}],
          { cancelable: false }
        )
      }
    }
  }

  acceptPayments(vendor) {
    if(disableBtn === false) {
      disableBtn = true;
      if(!vendor) {
        Alert.alert(
          '',
          'You must create a Vendor account before accepting payments.',
          [{ text: 'OK', onPress: () => { disableBtn = false }}],
          { cancelable: false }
        )
      } else {
        disableBtn = false;
      }
    }
  }

  navigateToAccountInfo() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'VendorAccountInfo' });
      this.enableBtns();
    }
  }

  render() {
    const { avatarURL, vendor, menu } = this.props;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <CacheImage
                style={styles.avatar}
                type='image'
                source={
                  avatarURL
                    ? avatarURL
                    : require('../../../../assets/images/etc/default-avatar.png')
                }
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() => this.navigateToAccountInfo()}
              title={`${vendor ? 'Update' : 'Create'} Vendor Profile`}
              icon="add"
            />
            <MenuButton
              onPress={() => this.createMenu(vendor, menu)}
              title={`${menu ? 'Update' : 'Create'} Menu`}
              icon="add"
            />
            <MenuButton onPress={() => this.acceptPayments(vendor)} title="Accept Payments" icon="add" />
            <MenuButton
              onPress={() =>
                this.props.navigate({ routeName: 'CustomerProfileNavigator' })
              }
              title="Switch to User Account"
              icon="repeat"
            />
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => this.logout()}>
              <View style={styles.footerRight}>
                <Text style={styles.footerText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}
