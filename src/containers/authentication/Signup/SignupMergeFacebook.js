// @flow
import React from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  Dimensions,
  Keyboard,
  InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, Header } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { uploadImage } from '../../../modules/upload';
import { updateFacebookAccount } from '../../../modules/user';
import { loginWithEmail } from '../../../modules/auth';
import { updateAvatarURL, updatePassword } from '../../../modules/Signup';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM, INTERNET_NOT_CONNECTED, TIME_OUT } from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import FacebookButton from '../../../components/FacebookButton';
import Button from '../../../components/Button';
import alert from '../../../components/GenericAlert';
import NextButton from './NextButton';
import { Feather } from '@expo/vector-icons';
import CacheImage from '../../../components/CacheImage';
import { showAlertWithMessage } from '../../../services/commonFunctions';

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
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    marginBottom: hp('4.55%'),
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
  nameAndEmailContainer: {
    paddingLeft: wp('6.4%'),
    justifyContent: 'center'
  },
  name: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    marginBottom: hp('1.72%'),
    backgroundColor: 'transparent'
  },
  email: {
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY,
    color: '#959595',
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    width: '100%',
    height: 'auto',
    marginTop: wp('13.33%')
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

class SignupMergeFacebook extends React.Component<Props, State> {
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

  constructor() {
    super();
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
        if (gap < 0 && scrollViewRef.current) {
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
    if(scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0, y: 0, animated: true
      });
    }
    keyboardDidShowCalled = false;
  }

  isFormValid() {
    const { password } = this.props;
    return password ? true : false;
  }

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
  }

  loginAndUpdateFacebook() {
    if(disableBtn === false) {
      disableBtn = true;
      const {
        email,
        password,
        loginWithEmail,
        facebookId,
        facebookToken
      } = this.props;

      this.setState({ isBusy: true }, () => {
        this.props.loginWithEmail(email, password)
          .then(() => this.props.updateFacebookAccount(facebookId, facebookToken))
          .then(() => this.navigateToMain())
          .catch(error => showAlertWithMessage('Uh-oh!', error))
          .finally(() => this.setState({ isBusy: false }, () => {
            this.enableBtns();
          }));
      });
    }
  }

  navigateToMain() {
    this.props.navigate({ routeName: 'Customer' });
  }

  render() {
    const { showPassword, isBusy } = this.state;
    const { firstName, email, password, avatarURL } = this.props;

    return (
      <CacheImage
        style={styles.container}
        type='backgroundImage'
        source={require('../../../../assets/images/bg/authentication.jpg')}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}>
            <Text style={styles.headerTextLine1}>You're already</Text>
            <Text style={styles.headerTextLine2}>here!</Text>

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
                    style={buttonStyles.facebookButton}
                    onStart={() => this.setState({isBusy: true})}
                    onFailure={() => this.setState({isBusy: false})}
                    onCancel={() => this.setState({isBusy: false})}
                    onSuccess={(facebookId, accessToken) => {
                      console.log('facebook info', facebookId, accessToken);
                    }}
                  />

                  <Button
                    style={buttonStyles.password}
                    textStyle={buttonStyles.textStyle}
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
                  ref={buttonRef}
                  style={buttonStyles.next}
                  disabled={!this.isFormValid()}
                  isBusy={isBusy}
                  onPress={() => this.loginAndUpdateFacebook()}
                />
              )
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </CacheImage>
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
