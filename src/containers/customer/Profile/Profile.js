// @flow
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import {
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  COLOR_BLACK
} from '../../../services/constants';

class Profile extends Component {
  static displayName = 'Profile';

  static navigationOptions = {
    title: 'My Profile',
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
    ),
    headerStyle: {
      position: 'absolute',
      backgroundColor: '#2B2C2C',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
    headerTintColor: '#fff'
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  async logout() {
    await snapshot.clearSnapshot();
    this.props.navigate({routeName: 'Authentication'});
  }

  navigateToEditProfile() {
    console.log('Pressed');
    this.props.navigate({routeName: 'EditProfile'});
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
                  : require('../../../../assets/images/etc/default-avatar.png')}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() => this.navigateToEditProfile()}
              title='My Information'
              subtitle='Edit my personal information'
              icon='chevron-right'
            />
            <MenuButton
              onPress={() => this.props.navigate(null)}
              title='Payment Methods'
              subtitle='Edit my payment methods'
              icon='chevron-right'
            />
            <MenuButton
              onPress={() => this.props.navigate(null)}
              title='My History'
              icon='chevron-right'
            />
            <MenuButton
              onPress={() => this.props.navigate({routeName: 'Vendor'})}
              title='Switch to Vendor Account'
              icon='repeat'
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
    flex: 0.68,
    marginBottom: 20,
    marginTop: 20
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    marginTop: 28
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 70
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flex: 0.15,
    flexDirection: 'row',
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
    flex: 1,
    justifyContent: 'space-between'
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  }
});

export default Profile;