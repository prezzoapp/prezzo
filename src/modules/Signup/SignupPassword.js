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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {ActionSheet} from 'native-base';
import {FONT_FAMILY, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import FacebookButton from '../../components/FacebookButton';
import Button from '../../components/Button';
import NextButton from './NextButton';

type Props = {
  navigate: Function
};

type State = {
  email: string,
  isSubscribedToPromotions: boolean
};

class SignupPassword extends React.Component<Props, State> {
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
    password: '',
    showPassword: false
  };

  getAvatar() {
    return require('../../../assets/images/etc/default-avatar.png');
  }

  showAvatarActionSheet() {
    const BUTTONS = ['Show Camera Roll', 'Cancel'];
    const CANCEL_INDEX = 1;

    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: 'Select a picture'
    }, buttonIndex => {
      console.log('clicked ActionSheet button index', buttonIndex);
    });
  }

  navigateToSignupComplete() {
    this.props.navigate({routeName: 'SignupComplete'});
  }

  render() {
    const {firstName, email, showPassword} = this.state;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          You're already here!
        </Text>

        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => this.showAvatarActionSheet()}
          >
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

        {
          !showPassword && (
            <View style={styles.buttonsContainer}>
              <FacebookButton />

              <Button
                style={buttonStyles.password}
                onPress={() => this.setState({showPassword: true})}
              >
                Create Password
              </Button>
            </View>
          )
        }

        {
          showPassword && (
            <View style={styles.passwordContainer}>
              <LoginTextInput
                type='password'
                label='Password'
                onChange={password => console.log('updated password', password)}
              />
            </View>
          )
        }

        {
          showPassword && (
            <NextButton
              style={buttonStyles.next}
              onPress={() => this.navigateToSignupComplete()}
            />
          )
        }
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
  },
  buttonsContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 20
  },
  passwordContainer: {
    width: '100%',
    height: 'auto'
  }
});

const buttonStyles = {
  password: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderColor: '#fff'
  },
  next: {
    alignSelf: 'flex-end'
  }
};

export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(SignupPassword);
