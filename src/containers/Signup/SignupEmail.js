// @flow
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {updateEmail, updateSubscriptionToPromotions} from '../../modules/signup';
import {FONT_FAMILY_MEDIUM, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import NextButton from './NextButton';

type Props = {
  updateEmail: Function,
  updateSubscriptionToPromotions: Function,
  navigate: Function
};

class SignupEmail extends React.Component<Props> {
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

  getCheckboxImage() {
    return this.props.isSubscribedToPromotions
      ? require('../../../assets/images/icons/checkbox-checked.png')
      : require('../../../assets/images/icons/checkbox-unchecked.png');
  }

  toggleSubscription() {
    const isSubscribedToPromotions = !this.props.isSubscribedToPromotions;
    this.props.updateSubscriptionToPromotions(isSubscribedToPromotions);
  }

  navigateToPassword() {
    this.props.navigate({routeName: 'SignupPassword'});
  }

  render() {
    const {email} = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          And your email?
        </Text>

        <LoginTextInput
          type='email'
          label='Email Address'
          value={email}
          onChange={value => this.props.updateEmail(value)}
        />

        <TouchableOpacity
          style={styles.promotionsContainer}
          onPress={() => this.toggleSubscription()}
        >
          <Image
            style={styles.checkbox}
            source={this.getCheckboxImage()}
          />
          <Text style={styles.promotionalText}>
            I'd like to receive promotional communications.
          </Text>
        </TouchableOpacity>

        <NextButton
          style={nextButtonStyle}
          onPress={() => this.navigateToPassword()}
        />
      </ImageBackground>
    );
  }
}

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;
const checkboxSize: number = 25;

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
    marginBottom: 40,
    backgroundColor: 'transparent'
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

export default connect(state => ({
  email: state.get('signup').get('email'),
  isSubscribedToPromotions: state.get('signup').get('isSubscribedToPromotions')
}), dispatch => {
  return {
    updateEmail: bindActionCreators(updateEmail, dispatch),
    updateSubscriptionToPromotions: bindActionCreators(
      updateSubscriptionToPromotions,
      dispatch
    ),
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
})(SignupEmail);
