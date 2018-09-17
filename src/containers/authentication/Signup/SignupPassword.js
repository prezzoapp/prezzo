// @flow
import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActionSheetIOS
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { uploadImage } from '../../../modules/upload';
import { updateUser } from '../../../modules/user';
import { updateAvatarURL, updatePassword, signup } from '../../../modules/Signup';
import { FONT_FAMILY, FONT_FAMILY_BOLD } from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import FacebookButton from '../../../components/FacebookButton';
import Button from '../../../components/Button';
import NextButton from './NextButton';
import { ImagePicker, Permissions } from 'expo';
import { getTimeStampString } from '../../../services/commonFunctions';

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

class SignupPassword extends React.Component<Props, State> {
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
      this.setState({ showPassword: true });
    }
  }

  showAvatarActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Take Photo', 'Choose from Library', 'Cancel'],
      cancelButtonIndex: 2,
      title: 'Select an avatar'
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.requestCameraPermission();
        } else if (buttonIndex === 1) {
          this.requestPhotoLibraryPermission();

        } 
      });
  }

  requestPhotoLibraryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.openImageGallery()
    }
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.openCamera()
    }
  }

  openImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3,
    });

    if (!result.cancelled) {
      this.setState({ upload: result });
      this.props.updateAvatarURL(result.uri);
    }
  }

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3,
    });

    if (!result.cancelled) {
      this.setState({ upload: result });
      this.props.updateAvatarURL(result.uri);
    }
  }

  isFormValid() {
    const { password } = this.props;
    return password ? true : false;
  }

  async uploadPhoto() {
    if (!this.state.upload) {
      return;
    }
    
    const { uri } = this.state.upload;
    const { updateUser, uploadImage } = this.props;
    const fileName = getTimeStampString() + '.jpg'

    const avatarURL = await uploadImage(
      uri,
      0,
      'image/jpeg',
      fileName,
      'userAvatar',
      'public-read'
    );

    console.log('got avatarURL', avatarURL);

    this.setState({
      avatarURL,
      upload: null
    });

    await updateUser(avatarURL);
  }

  signup() {
    this.setState({ isBusy: true });
    this.props.signup()
      .then(() => this.uploadPhoto())
      .then(() => this.navigateToSignupComplete())
      .catch(e => console.log('error signing up', e))
      .finally(() => this.setState({ isBusy: false }));
  }

  navigateToSignupComplete() {
    this.props.navigate({ routeName: 'SignupComplete' });
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
          Awesome, you're almost done!
        </Text>

        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => this.showAvatarActionSheet()}
          >
            <Image
              style={styles.avatar}
              source={
                avatarURL
                  ? { uri: avatarURL }
                  : require('../../../../assets/images/etc/default-avatar.png')
              }
            />
            <Image
              style={styles.editAvatarIcon}
              source={require('../../../../assets/images/icons/edit.png')}
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
              <FacebookButton
                disabled={isBusy}
                onStart={() => this.setState({ isBusy: true })}
                onFailure={() => this.setState({ isBusy: false })}
                onCancel={() => this.setState({ isBusy: false })}
                onSuccess={(facebookId, accessToken) => {
                  console.log('facebook info', facebookId, accessToken);
                }}
              />

              <Button
                style={buttonStyles.password}
                onPress={() => this.setState({ showPassword: true })}
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
          showPassword && !isBusy && (
            <NextButton
              style={buttonStyles.next}
              disabled={!this.isFormValid()}
              onPress={() => this.signup()}
            />
          )
        }
      </ImageBackground>
    );
  }
}

export default connect(state => ({
  avatarURL: state.get('signup').get('avatarURL'),
  firstName: state.get('signup').get('firstName'),
  lastName: state.get('signup').get('lastName'),
  email: state.get('signup').get('email'),
  password: state.get('signup').get('password'),
  facebookId: state.get('signup').get('facebookId')
}), dispatch => {
  return {
    signup: bindActionCreators(signup, dispatch),
    updateAvatarURL: bindActionCreators(updateAvatarURL, dispatch),
    updatePassword: bindActionCreators(updatePassword, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
})(SignupPassword);
