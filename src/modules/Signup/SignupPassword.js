// @flow
import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {FONT_FAMILY, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import NextButton from './NextButton';

type Props = {
  navigate: PropTypes.func.isRequired
};

type State = {
  email: string,
  isSubscribedToPromotions: boolean
};

class SignupEmail extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
    headerTintColor: '#fff'
  };

  state = {
    firstName: 'Andreas',
    email: 'andreas@yahoo.com',
    password: ''
  };

  getAvatar() {
    return require('../../../assets/images/etc/default-avatar.png');
  }

  render() {
    const {firstName, email} = this.state;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          You're already here!
        </Text>

        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={this.getAvatar()}
            />
              <Image
                style={styles.editAvatarIcon}
                source={require('../../../assets/images/icons/edit.png')}
              />
          </TouchableOpacity>

          <View style={styles.nameAndEmailContainer}>
            <Text style={styles.name}>
              {firstName}
            </Text>

            <Text style={styles.email}>
              {email}
            </Text>
          </View>
        </View>

        <LoginTextInput
          type='password'
          label='Password'
          onChange={password => console.log('updated password', password)}
        />

        <NextButton style={nextButtonStyle} />
      </ImageBackground>
    );
  }
}

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;
const avatarSize: number = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingTop: containerPaddingTopBottom,
    paddingBottom: containerPaddingTopBottom
  },
  headerText: {
    fontSize: 30,
    fontFamily: FONT_FAMILY_BOLD,
    color: '#fff',
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  profileContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatarContainer: {
    width: avatarSize * 1.2,
    height: avatarSize * 1.2,
    position: 'relative',
    flex: 2
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: avatarSize / 2,
    resizeMode: 'contain'
  },
  editAvatarIcon: {
    width: avatarSize / 2.5,
    height: avatarSize / 2.5,
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: avatarSize / 5,
    backgroundColor: '#484848'
  },
  nameAndEmailContainer: {
    flex: 5,
    paddingLeft: 20
  },
  name: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_BOLD,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  email: {
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    color: '#959595',
    backgroundColor: 'transparent'
  }
});

const nextButtonStyle = {
  alignSelf: 'flex-end'
};

export default SignupEmail;
