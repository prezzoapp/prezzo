// @flow
import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  Keyboard
} from 'react-native';
import { Header } from 'react-navigation';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Constants } from 'expo';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Feather } from '../../../components/VectorIcons';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {updateFirstName, updateLastName} from '../../../modules/Signup';
import {FONT_FAMILY_MEDIUM} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import NextButton from './NextButton';

type Props = {
  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

type State = {
  firstName: string,
  lastName: string
};

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;

const SCROLL_VIEW_TOP_PADDING = hp('13.42%') - (Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 13 : 0));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    paddingTop: Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 20 : 0)
  },
  scrollView: {
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingBottom: hp('5%'),
    paddingTop: SCROLL_VIEW_TOP_PADDING
  },
  headerText: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    marginBottom: hp('5.04%'),
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
  alignSelf: 'flex-end'
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
      borderBottomColor: 'transparent'
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
          size={wp('8%')}
        />
      </TouchableOpacity>
    )
  });

  isFormValid() {
    const {firstName, lastName} = this.props;
    return firstName && lastName ? true : false;
  }

  navigateToSignupEmail() {
    this.props.navigate({routeName: 'SignupEmail'});
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  _keyboardDidShow = (event) => {
    if(this.scrollView && this.child) {
      this.scrollView.scrollTo({
        y: this.titleHeight + SCROLL_VIEW_TOP_PADDING,
        animated: true
      });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  calculateLayout() {
    if(this.child && this.parent) {
      UIManager.measure(findNodeHandle(this.child), (
        originX, originY, width, height, pageX, pageY
      ) => {
        this.titleHeight = height;
      })
    }
  }

  render() {
    const {firstName, lastName} = this.props;
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
        ref={parent => this.parent = parent}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            contentContainerStyle={styles.scrollView}>
            <View
              ref={child => this.child = child}
              onLayout={() => this.calculateLayout()}
              style={{ backgroundColor: 'transparent' }}
            >
              <Text style={styles.headerText}>
                What's your name?
              </Text>
            </View>

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
              onChange={val => this.props.updateLastName(val)}
            />

            <NextButton
              style={nextButtonStyle}
              onPress={() => this.navigateToSignupEmail()}
              disabled={!this.isFormValid()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
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
