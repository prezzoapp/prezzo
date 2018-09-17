// @flow
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-navigation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import { FONT_FAMILY, COLOR_BLACK } from '../../../services/constants';

class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      //position: 'absolute',
      backgroundColor: '#2B2C2C',
      // backgroundColor: 'orange',
      //zIndex: 100,
      //top: 0,
      //left: 0,
      //right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
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
    this.props.navigate({ routeName: 'Authentication' });
    await this.props.userLogout();
    await snapshot.clearSnapshot();
  }

  navigateToEditProfile() {
    this.props.navigate({ routeName: 'EditProfile' });
  }

  render() {
    const { avatarURL } = this.props;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
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
              onPress={() => {}}
              title="Payment Methods"
              subtitle="Edit my payment methods"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => {}}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'cover',
    width: 102
  },
  avatarContainer: {
    height: 102,
    width: 102
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 25,
    marginBottom: 10
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 'auto',
    marginTop: 20
  },
  footerLeft: {
    alignSelf: 'flex-start'
  },
  footerRight: {
    alignSelf: 'flex-end'
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY,
    fontSize: 18
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  }
});

export default Profile;
