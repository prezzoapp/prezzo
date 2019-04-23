// @flow
import React from 'react';
import ReactNative, {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  findNodeHandle,
  UIManager,
  Dimensions,
  Keyboard,
  InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, Header } from 'react-navigation';
import { ActionSheet } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { uploadImage } from '../../../modules/upload';
import { updateUser } from '../../../modules/user';
import { updateAvatarURL, updatePassword, signup } from '../../../modules/Signup';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  INTERNET_NOT_CONNECTED,
  NETWORK_REQUEST_FAILED,
  TIME_OUT
} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import FacebookButton from '../../../components/FacebookButton';
import Button from '../../../components/Button';
import NextButton from './NextButton';
import { ImagePicker, Permissions, Constants } from 'expo';
import { getTimeStampString, showAlertWithMessage } from '../../../services/commonFunctions';
import { Feather } from '../../../components/VectorIcons';
import LoadingComponent from '../../../components/LoadingComponent';
import CacheImage from '../../../components/CacheImage';

const windowHeight = Dimensions.get('window').height;
let keyboardDidShowCalled = false;

const buttonRef = React.createRef();
const scrollViewRef = React.createRef();
let gap = 0;

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

const containerPaddingLeftRight: number = wp('10.66%');
const containerPaddingTopBottom: number = 80;
const avatarSize: number = wp('17.33%');
const SCROLL_VIEW_TOP_PADDING = hp('14.40%') - (Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 13 : 0));

let disableBtn = false;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    paddingTop: Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 20 : 0)
  },
  scrollView: {
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingBottom: hp('3%'),
    paddingTop: SCROLL_VIEW_TOP_PADDING
  },
  headerTextLine1: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    backgroundColor: 'transparent',
    lineHeight: 41
  },
  headerTextLine2: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_BOLD,
    color: '#fff',
    marginBottom: wp('6.13%'),
    backgroundColor: 'transparent',
    lineHeight: 41
  },
  profileContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    paddingLeft: wp('0.8%')
  },
  avatarContainer: {
    alignItems: 'center',
    height: avatarSize,
    justifyContent: 'center',
    position: 'relative',
    width: avatarSize
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: avatarSize / 2,
    resizeMode: 'cover'
  },
  editIconContainer: {
    width: wp('5.66%'),
    height: wp('5.66%'),
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: wp('5.66%') / 2,
    overflow: 'hidden'
  },
  editAvatarIcon: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: '#484848'
  },
  nameAndEmailContainer: {
    paddingLeft: wp('6.4%'),
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    marginBottom: wp('3.73%'),
    backgroundColor: 'transparent'
  },
  email: {
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY,
    color: '#959595',
    flex: 1,
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    marginTop: wp('13.33%'),
    width: '100%',
    height: 'auto'
  },
  passwordContainer: {
    marginTop: wp('13.86%'),
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
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});

const buttonStyles = {
  password: {
    marginTop: wp('3.73%'),
    backgroundColor: 'transparent',
    borderColor: '#fff',
    height: wp('11.46%'),
    justifyContent: 'center'
  },
  next: {
    alignSelf: 'flex-end',
    position: 'relative',
    marginTop: wp('1.6%')
  },
  facebookButton: {
    width: '100%',
    height: wp('11.46%')
  },
  textStyle: {
    paddingTop: 0,
    paddingBottom: 0
  }
};

class SignupPassword extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      elevation: 0
    },
    headerTintColor: '#fff',
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('8%')}
        />
      </TouchableOpacity>
    )
  });

  state = {
    isBusy: false,

    // PATCH: set `showPassword` to true
    //        hides facebook btn by default
    // TODO: set `showPassword` to false
    // showPassword: false
    showPassword: true
    // END PATCH
  };

  showAvatarActionSheet() {
    ActionSheet.show(
      {
        options: ['Take Photo', 'Choose from Library', 'Cancel'],
        cancelButtonIndex: 2,
        title: "Select an avatar"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.requestCameraPermission();
        } else if (buttonIndex === 1) {
          this.requestPhotoLibraryPermission();
        }
      }
    );
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
    try {
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
    } catch(e) {
      throw e;
    }
  }

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
  }

  signup() {
    if(disableBtn === false) {
      disableBtn = true;
      this.setState({ isBusy: true }, () => {
        this.props.signup()
          .then(() => this.uploadPhoto())
          .then(() => this.navigateToSignupComplete())
          .catch(err => {
            showAlertWithMessage('Uh-oh!', err);
          })
          .finally(() => this.setState({ isBusy: false }, () => {
            this.enableBtns();
          }));
      });
    }
  }

  navigateToSignupComplete() {
    this.props.navigate({ routeName: 'SignupComplete' });
  }

  componentWillMount() {
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardShow.remove();
    this.keyboardHide.remove();
  }

  keyboardDidShow = event => {
    if(keyboardDidShowCalled === false) {
      keyboardDidShowCalled = true;
      const keyboardHeight = event.endCoordinates.height;
      const button = ReactNative.findNodeHandle(buttonRef.current);
      UIManager.measure(button, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        if (gap < 0) {
          scrollViewRef.current.scrollTo({
            x: 0, y: -gap, animated: true
          });
        } else {
          console.log('Gap: ', gap);
        }
      });
    }
  }

  keyboardDidHide = event => {
    scrollViewRef.current.scrollTo({
      x: 0, y: 0, animated: true
    });
    keyboardDidShowCalled = false;
  }

  render() {
    const { showPassword, isBusy } = this.state;
    const { firstName, email, password, avatarURL } = this.props;
    console.log(avatarURL);

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.jpg')}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding">
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}>
            <Text style={styles.headerTextLine1}>
              Awesome, you're
            </Text>
            <Text style={styles.headerTextLine2}>
              almost done!
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
                      ? {uri: avatarURL}
                      : require('../../../../assets/images/etc/default-avatar.png')
                  }
                />
                <View style={styles.editIconContainer}>
                  <Image
                    style={styles.editAvatarIcon}
                    source={require('../../../../assets/images/icons/edit.png')}
                  />
                </View>
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
                    style={buttonStyles.facebookButton}
                    onStart={() => this.setState({ isBusy: true })}
                    onFailure={() => this.setState({ isBusy: false })}
                    onCancel={() => this.setState({ isBusy: false })}
                    onSuccess={(facebookId, accessToken) => {
                      console.log('facebook info', facebookId, accessToken);
                    }}
                  />

                  <Button
                    style={buttonStyles.password}
                    textStyle={buttonStyles.textStyle}
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
                  ref={buttonRef}
                  style={buttonStyles.next}
                  disabled={!this.isFormValid()}
                  onPress={() => this.signup()}
                />
              )
            }
          </ScrollView>
        </KeyboardAvoidingView>
        <LoadingComponent visible={this.state.isBusy} />
      </CacheImage>
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
