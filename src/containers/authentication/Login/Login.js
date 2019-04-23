// @flow
import React from 'react';
import { Header } from 'react-navigation';
import ReactNative, {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  findNodeHandle,
  UIManager,
  Dimensions,
  Keyboard,
  InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';
import { Feather } from '../../../components/VectorIcons';
import LoginTextInput from '../../../components/LoginTextInput';
import Button from '../../../components/Button';
import { Constants } from 'expo';
import CacheImage from '../../../components/CacheImage';
import LoadingComponent from '../../../components/LoadingComponent';
import { showAlertWithMessage } from '../../../services/commonFunctions';

const windowHeight = Dimensions.get('window').height;
let keyboardDidShowCalled = false;

const buttonRef = React.createRef();
const scrollViewRef = React.createRef();
let gap = 0;

type Props = {
  loginWithEmail: Function,
  navigate: PropTypes.func.isRequired
};

type State = {
  email: string,
  password: string
};

const SCROLL_VIEW_TOP_PADDING = hp('13.42%') - (Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 13 : 0));
let disableBtn = false;

class Login extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
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
    email: '',
    password: ''
  };

  navigateToSignup() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'SignupName' });
      this.enableBtns();
    }
  }

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
  }

  login() {
    if(disableBtn === false) {
      disableBtn = true;
      const { email, password } = this.state;

      this.props.loginWithEmail(email, password)
        .then(() => {
          this.props.navigate({ routeName: 'Customer' });
          this.enableBtns();
        })
      .catch(e => showAlertWithMessage('Uh-oh!', e, () => {
        this.enableBtns();
      }));
    }
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
    const { email, password } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.jpg')}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'
        >
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}>
            <Text testID="welcomeText" style={styles.headerText}>
              Welcome back!
            </Text>

            <Text testID="signinText" style={styles.subHeaderText}>
              Sign In To Continue
            </Text>

            <LoginTextInput
              type="email"
              label="Email Address"
              value={email}
              onChange={email => this.setState({ email })}
            />

            <LoginTextInput
              type="password"
              label="Password"
              value={password}
              containerPaddingBottom={0}
              onChange={password => this.setState({ password })}
            />

            <TouchableOpacity
              testID="signupButton"
              style={styles.signupLabelContainer}
              onPress={() => this.navigateToSignup()}
            >
              <Text style={styles.signupLabel}>Don't have an account?</Text>

              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button
                ref={buttonRef}
                style={buttonStyles.login}
                textStyle={buttonStyles.loginText}
                onPress={() => this.login()}
              >
                Sign In
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <LoadingComponent visible={this.props.isBusy} />
      </ImageBackground>
    );
  }
}

const containerPaddingLeftRight: number = wp('10.66%');
const containerPaddingTopBottom: number = hp('9.85%');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    paddingTop: Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 20 : 0)
  },
  scrollView: {
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingTop: SCROLL_VIEW_TOP_PADDING,
    paddingBottom: hp('3%')
  },
  headerText: {
    fontSize: wp('10.16%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    letterSpacing: 0,
    backgroundColor: 'transparent',
    paddingTop: hp('0%')
  },
  subHeaderText: {
    fontSize: wp('6.13%'),
    fontFamily: FONT_FAMILY,
    color: '#fff',
    letterSpacing: 0,
    marginBottom: hp('4.92%'),
    backgroundColor: 'transparent',
    marginTop: 5
  },
  signupLabelContainer: {
    width: '100%',
    height: 'auto',
    marginVertical: wp('6%'),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    display: 'flex'
  },
  signupLabel: {
    color: '#959595',
    fontSize: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    marginRight: 4
  },
  signupLink: {
    color: '#fff',
    fontSize: wp('4.53%'),
    fontFamily: FONT_FAMILY
  },
  buttonContainer: {
    alignItems: 'center'
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});

const buttonStyles = {
  login: {
    width: wp('42.66%'),
    height: hp('6.65%'),
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 0,
    paddingBottom: 0
  }
};

export default Login;
