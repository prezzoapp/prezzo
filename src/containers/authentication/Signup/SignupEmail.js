// @flow
import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Header } from 'react-navigation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Constants } from 'expo';
import { findUser } from '../../../modules/user';
import {
  updateEmail,
  updateSubscriptionToPromotions
} from '../../../modules/Signup';
import { isValidEmail } from '../../../utils/validators';
import {
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_BOLD
} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import alert from '../../../components/GenericAlert';
import NextButton from './NextButton';

type Props = {
  updateEmail: Function,
  updateSubscriptionToPromotions: Function,
  navigate: Function
};

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;
const checkboxSize: number = 25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingTop: hp('3.50%') + (Header.HEIGHT + Constants.statusBarHeight - (Platform.OS === 'ios' ? 20 : 0)),
    paddingBottom: containerPaddingTopBottom
  },
  headerText: {
    fontSize: 30,
    fontFamily: FONT_FAMILY_BOLD,
    color: '#fff',
    marginBottom: 40,
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
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {
    width: checkboxSize,
    height: checkboxSize,
    marginRight: 20
  },
  promotionalText: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#fff',
    backgroundColor: 'transparent'
  }
});

const nextButtonStyle = {
  alignSelf: 'flex-end'
};

class SignupEmail extends React.Component<Props> {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    headerTintColor: '#fff'
  };

  isFormValid() {
    const { email } = this.props;
    return email && isValidEmail(email) ? true : false;
  }

  getCheckboxImage() {
    return this.props.isSubscribedToPromotions
      ? require('../../../../assets/images/icons/checkbox-checked.png')
      : require('../../../../assets/images/icons/checkbox-unchecked.png');
  }

  toggleSubscription() {
    const isSubscribedToPromotions = !this.props.isSubscribedToPromotions;
    this.props.updateSubscriptionToPromotions(isSubscribedToPromotions);
  }

  navigateToPassword() {
    this.props.navigate({ routeName: 'SignupPassword' });
  }

  render() {
    const { email, findUser } = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>And your email?</Text>

        <LoginTextInput
          type="email"
          label="Email Address"
          value={email}
          onChange={value => this.props.updateEmail(value)}
        />

        <TouchableOpacity
          style={styles.promotionsContainer}
          onPress={() => this.toggleSubscription()}
        >
          <Image style={styles.checkbox} source={this.getCheckboxImage()} />
          <Text style={styles.promotionalText}>
            I'd like to receive promotional communications.
          </Text>
        </TouchableOpacity>

        <NextButton
          style={nextButtonStyle}
          disabled={!this.isFormValid()}
          validate={async () => {
            const user = await findUser(email);
            if (user) {
              throw Error('This email is taken.');
            }
          }}
          onPress={() => this.navigateToPassword()}
          onError={e => alert('Uh-oh!', e.message || e)}
        />
      </ImageBackground>
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
