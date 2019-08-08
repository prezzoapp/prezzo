// @flow
import React from 'react';
import ReactNative, {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TouchableOpacity,
  Keyboard,
  UIManager,
  Dimensions,
  findNodeHandle,
  InteractionManager
} from 'react-native';
import { Header } from 'react-navigation';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Feather } from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {updateFirstName, updateLastName} from '../../../modules/Signup';
import {FONT_FAMILY_MEDIUM} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import NextButton from './NextButton';
import CacheImage from '../../../components/CacheImage';

const windowHeight = Dimensions.get('window').height;
let keyboardDidShowCalled = false;

const buttonRef = React.createRef();
const scrollViewRef = React.createRef();
let gap = 0;
let btnPosition = 0;

type Props = {
  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

type State = {
  firstName: string,
  lastName: string
};

const containerPaddingLeftRight: number = wp('10.66%');
const containerPaddingTopBottom: number = 80;

let disableBtn = false;

const SCROLL_VIEW_TOP_PADDING = hp('14.40%') - (Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 13 : 0));

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
    lineHeight: hp(7),
    backgroundColor: 'transparent'
  },
  headerTextLine2: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    lineHeight: hp(7),
    marginBottom: wp('10.93%'),
    backgroundColor: 'transparent'
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

const nextButtonStyle = {
  alignSelf: 'flex-end',
  position: 'relative',
  marginTop: wp('8.53%')
};

class SignupName extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      borderBottomColor: 'transparent',
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('7%')}
        />
      </TouchableOpacity>
    )
  });

  isFormValid() {
    const {firstName, lastName} = this.props;
    return firstName && lastName ? true : false;
  }

  navigateToSignupEmail() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({routeName: 'SignupEmail'});
      this.enableBtns();
    }
  }

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
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

  render() {
    const {firstName, lastName} = this.props;
    return (
      <CacheImage
        style={styles.container}
        type='backgroundImage'
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
            <Text style={styles.headerTextLine1}>What's your</Text>
            <Text style={styles.headerTextLine2}>name?</Text>

            <LoginTextInput
              type='name'
              label='First Name'
              value={firstName}
              onChange={val => this.props.updateFirstName(val)}
            />

            <LoginTextInput
              type='name'
              label='Last Name'
              value={lastName}
              containerPaddingBottom={0}
              onChange={val => this.props.updateLastName(val)}
            />

            <NextButton
              ref={buttonRef}
              style={nextButtonStyle}
              onPress={() => this.navigateToSignupEmail()}
              disabled={!this.isFormValid()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </CacheImage>
    );
  }
}

export default connect(state => ({
  firstName: state.get('signup').get('firstName'),
  lastName: state.get('signup').get('lastName')
}), dispatch => {
  return {
    updateFirstName: bindActionCreators(updateFirstName, dispatch),
    updateLastName: bindActionCreators(updateLastName, dispatch),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
})(SignupName);
