// @flow
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import LoadingComponent from '../../../components/LoadingComponent';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';
import { showAlertWithMessage } from '../../../services/commonFunctions';

let disableBtn = false;

class Profile extends Component {
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
        numberOfLines={1}>My Profile
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
    userLogout: PropTypes.func.isRequired
  };

  async logout() {
    if(disableBtn === false) {
      disableBtn = true;
      try {
        await this.props.userLogout();
        await snapshot.clearSnapshot();
        disableBtn = false;
      } catch(err) {
        showAlertWithMessage('Uh-oh!', err, () => {
          disableBtn = false;
        });
      }
    }
  }

  navigateToEditProfile() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'EditProfile' });
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    }
  }

  navigateToPaymentMenu() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'PaymentMenu' });
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    }
  }

  render() {
    const { avatarURL } = this.props;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.imageHolder}>
              <Image style={styles.avatar}
                source={
                  avatarURL
                  ? { uri: avatarURL }
                  : require('../../../../assets/images/etc/default-avatar.png')}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() => this.navigateToEditProfile()}
              title="My Information"
              subtitle="Edit my personal information"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => this.navigateToPaymentMenu()}
              title="Payment Methods"
              subtitle="Edit my payment methods"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => null}
              title="My History"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => this.props.navigate({ routeName: 'Vendor' })}
              title="Switch to Vendor Account"
              icon="repeat"
            />
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => {}}>
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

        <LoadingComponent visible={this.props.logoutIsBusy} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  imageHolder: {
    height: wp('27.2%'),
    width: wp('27.2%'),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: wp('13.5%'),
    overflow: 'hidden'
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp('7.2%'),
    marginBottom: hp('1.23%')
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1
  },
  footerLeft: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: hp('10%')
  },
  footerRight: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: hp('10%')
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%')
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2.38%'),
    marginBottom: hp('3.44%')
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  }
});

export default Profile;
