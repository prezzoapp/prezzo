// @flow
import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONT_FAMILY_MEDIUM} from '../../../services/constants';

const prezzoBlack = '#2B2C2C';

class EditProfile extends Component {
  static displayName = 'Edit Profile';

  static navigationOptions = {
    title: 'My Information',
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerTitleStyle: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: 18
    },
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
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={require('../../../../assets/images/etc/default-avatar.png')}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: 2,
    flexDirection: 'column',
    marginTop: 28
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 25,
    marginTop: 90
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-between'
  },
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'contain',
    width: 102
  },
  avatarContainer: {
    flex: 0.68
  },
  parent: {
    alignItems: 'center',
    backgroundColor: prezzoBlack,
    flex: 1,
    justifyContent: 'center'
  }
});

export default EditProfile;
