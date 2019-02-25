// @flow
import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Header } from 'react-navigation';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Constants } from 'expo';
import { Feather } from '../../../components/VectorIcons';
import { findUser } from '../../../modules/user';
import {
  updateEmail,
  updateSubscriptionToPromotions
} from '../../../modules/Signup';
import { isValidEmail } from '../../../utils/validators';
import showGenericAlert from '../../../components/GenericAlert';
import {
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  INTERNET_NOT_CONNECTED
} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import alert from '../../../components/GenericAlert';
import CacheImage from '../../../components/CacheImage';
import NextButton from './NextButton';

type Props = {
  updateEmail: Function,
  updateSubscriptionToPromotions: Function,
  navigate: Function
};

const containerPaddingLeftRight: number = wp('10.66%');
const containerPaddingTopBottom: number = 80;
const checkboxSize: number = 25;
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
    paddingBottom: hp('5%'),
    paddingTop: SCROLL_VIEW_TOP_PADDING
  },
  headerTextLine1: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    lineHeight: 41,
    backgroundColor: 'transparent'
  },
  headerTextLine2: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    lineHeight: 41,
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
  promotionsContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: wp('6.66%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp('4.26%')
  },
  checkbox: {
    //width: checkboxSize,
    //height: checkboxSize,
    marginRight: wp('3.2%'),
    //resizeMode: 'contain'
  },
  promotionalText: {
    fontSize: wp('4.53%'),
    lineHeight: 27.51,
    fontFamily: FONT_FAMILY_REGULAR,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  }
});

const nextButtonStyle = {
  alignSelf: 'flex-end'
};

class SignupEmail extends React.Component<Props> {
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

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  handleConnectionChange = () => {}

  isFormValid() {
    const { email } = this.props;
    return email && isValidEmail(email) ? true : false;
  }

  toggleSubscription() {
    const isSubscribedToPromotions = !this.props.isSubscribedToPromotions;
    this.props.updateSubscriptionToPromotions(isSubscribedToPromotions);
  }

  navigateToPassword() {
    this.props.navigate({ routeName: 'SignupPassword' });
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  async checkEmailValidity() {
    const isConnected = await NetInfo.isConnected.fetch();
    if(isConnected === true) {
      try {
        const user = await this.props.findUser(this.props.email);
        if(user) {
          throw Error('This email is taken.');
        }
        this.navigateToPassword();
      } catch(err) {
        this.showAlert('Uh-oh!', err.message, 300);
      }
    } else {
      this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, 300);
    }
  }

  render() {
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
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}>
            <Text style={styles.headerTextLine1}>And, your</Text>
            <Text style={styles.headerTextLine2}>email?</Text>

            <LoginTextInput
              type="email"
              label="Email Address"
              value={this.props.email}
              labelPaddingBottom={wp('5%')}
              onChange={value => this.props.updateEmail(value)}
            />

            <TouchableOpacity
              style={styles.promotionsContainer}
              activeOpacity={0.8}
              onPress={() => this.toggleSubscription()}
            >
              <Feather
                style={styles.checkbox}
                name={(this.props.isSubscribedToPromotions) ? 'square' : 'check-square'}
                size={wp('7.2%')}
                color='white'
              />
              <Text style={styles.promotionalText}>
                I'd like to receive promotional communications.
              </Text>
            </TouchableOpacity>

            <NextButton
              style={nextButtonStyle}
              disabled={!this.isFormValid()}
              onPress={() => this.checkEmailValidity()}
              onError={e => alert('Uh-oh!', e.message || e)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </CacheImage>
    );
  }
}

export default connect(state => ({
  email: state.get('signup').get('email'),
  isSubscribedToPromotions: state.get('signup').get('isSubscribedToPromotions')
}), dispatch => {
  return {
    findUser: bindActionCreators(findUser, dispatch),
    updateEmail: bindActionCreators(updateEmail, dispatch),
    updateSubscriptionToPromotions: bindActionCreators(
      updateSubscriptionToPromotions,
      dispatch
    ),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
})(SignupEmail);
