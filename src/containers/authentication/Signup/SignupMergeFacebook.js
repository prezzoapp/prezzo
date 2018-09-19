// @flow
import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { uploadImage } from '../../../modules/upload';
import { updateFacebookAccount } from '../../../modules/user';
import { loginWithEmail } from '../../../modules/auth';
import { updateAvatarURL, updatePassword } from '../../../modules/Signup';
import { FONT_FAMILY, FONT_FAMILY_BOLD } from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import FacebookButton from '../../../components/FacebookButton';
import Button from '../../../components/Button';
import alert from '../../../components/GenericAlert';
import NextButton from './NextButton';

type Props = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  facebookId: string,
  updatePassword: Function,
  updateAvatarURL: Function,
  signup: Function,
  navigate: Function
};

type State = {
  avatarURL: mixed,
  showPassword: boolean
};

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
  },
  navigation: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0
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

class SignupMergeFacebook extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: styles.navigation,
    headerTintColor: '#fff'
  };

  state = {
    isBusy: false,

    // PATCH: set `showPassword` to true
    //        hides facebook btn by default
    // TODO: set `showPassword` to false
    // showPassword: false
    showPassword: true
    // END PATCH
  };

  componentDidMount() {
    if (this.props.facebookId) {
      this.setState({showPassword: true});
    }
  }

  isFormValid() {
    const { password } = this.props;
    return password ? true : false;
  }

  loginAndUpdateFacebook() {
    const {
      email,
      password,
      loginWithEmail,
      facebookId,
      facebookToken
    } = this.props;
    this.setState({ isBusy: true });
    this.props.loginWithEmail(email, password)
      .then(() => this.props.updateFacebookAccount(facebookId, facebookToken))
      .then(() => this.navigateToMain())
      .catch(error => alert('Uh-oh!', error.message || error))
      .finally(() => this.setState({ isBusy: false }));
    // this.props.signup()
    //   .then(() => this.uploadPhoto())
    //   .then(() => this.navigateToSignupComplete())
    //   .catch(e => console.log('error signing up', e))
    //   .finally(() => this.setState({isBusy: false}));
  }

  navigateToMain() {
    this.props.navigate({ routeName: 'Customer' });
  }

  render() {
    const { showPassword, isBusy } = this.state;
    const { firstName, email, password, avatarURL } = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          You're already here!
        </Text>

        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={
              avatarURL
              ? {uri: avatarURL}
              : require('../../../../assets/images/etc/default-avatar.png')
            }
          />

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
              <FacebookButton
                disabled={isBusy}
                onStart={() => this.setState({isBusy: true})}
                onFailure={() => this.setState({isBusy: false})}
                onCancel={() => this.setState({isBusy: false})}
                onSuccess={(facebookId, accessToken) => {
                  console.log('facebook info', facebookId, accessToken);
                }}
              />

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
              disabled={!this.isFormValid()}
              isBusy={isBusy}
              onPress={() => this.loginAndUpdateFacebook()}
            />
          )
        }
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    avatarURL: state.get('signup').get('avatarURL'),
    firstName: state.get('signup').get('firstName'),
    email: state.get('signup').get('email'),
    password: state.get('signup').get('password'),
    facebookId: state.get('signup').get('facebookId'),
    facebookToken: state.get('signup').get('facebookToken')
  }),
  dispatch => ({
    loginWithEmail: bindActionCreators(loginWithEmail, dispatch),
    updateAvatarURL: bindActionCreators(updateAvatarURL, dispatch),
    updatePassword: bindActionCreators(updatePassword, dispatch),
    updateFacebookAccount: bindActionCreators(updateFacebookAccount, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  })
)(SignupMergeFacebook);