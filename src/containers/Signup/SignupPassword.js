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
import ImagePicker from 'react-native-image-picker';
import {updateAvatarURL, updatePassword, signup} from '../../modules/signup';
import {FONT_FAMILY, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import FacebookButton from '../../components/FacebookButton';
import Button from '../../components/Button';
import NextButton from './NextButton';

type Props = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  updatePassword: Function,
  updateAvatarURL: Function,
  signup: Function,
  navigate: Function
};

type State = {
  avatarURL: mixed,
  showPassword: boolean
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
    avatarURL: require('../../../assets/images/etc/default-avatar.png'),
    showPassword: false
  };

  showAvatarActionSheet() {
    const options = {title: 'Select an avatar'};
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image URI: ', response.uri);
        this.props.updateAvatarURL(response.uri);
        const source = {uri: response.uri};
        this.setState({avatarURL: source});
      }
    });
  }

  signup() {
    const {firstName, lastName, email, password, avatarURL} = this.props;
    this.props.signup(firstName, lastName, email, password, avatarURL)
      .then(() => this.navigateToSignupComplete());
  }

  navigateToSignupComplete() {
    this.props.navigate({routeName: 'SignupComplete'});
  }

  render() {
    const {showPassword} = this.state;
    const {firstName, email, password} = this.props;

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
              source={this.state.avatarURL}
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
                value={password}
                onChange={value => this.props.updatePassword(value)}
              />
            </View>
          )
        }

        {
          showPassword && (
            <NextButton
              style={buttonStyles.next}
              onPress={() => this.signup()}
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
    alignItems: 'center',
    flex: 2,
    height: avatarSize * 1.2,
    justifyContent: 'center',
    position: 'relative',
    width: avatarSize * 1.2
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: avatarSize / 2,
    resizeMode: 'cover'
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

export default connect(state => ({
  firstName: state.get('signup').get('firstName'),
  lastName: state.get('signup').get('lastName'),
  email: state.get('signup').get('email'),
  password: state.get('signup').get('password'),
  avatarURL: state.get('signup').get('avatarURL')
}), dispatch => {
  return {
    signup: bindActionCreators(signup, dispatch),
    updateAvatarURL: bindActionCreators(updateAvatarURL, dispatch),
    updatePassword: bindActionCreators(updatePassword, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
})(SignupPassword);
