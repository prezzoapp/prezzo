// @flow
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FONT_FAMILY_MEDIUM, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import NextButton from './NextButton';

type Props = {
  navigate: PropTypes.func.isRequired
};

type State = {
  email: string,
  isSubscribedToPromotions: boolean
};

class SignupEmail extends React.Component<Props, State> {
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

  state = {
    email: '',
    isSubscribedToPromotions: true
  };

  getCheckboxImage() {
    return this.state.isSubscribedToPromotions ?
      require('../../../assets/images/icons/checkbox-checked.png')
      : require('../../../assets/images/icons/arrow-right.png');
  }

  toggleSubscription() {
    const isSubscribedToPromotions = !this.state.isSubscribedToPromotions;
    this.setState({isSubscribedToPromotions});
  }

  render() {
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
          onChange={email => console.log('updated email', email)}
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

        <NextButton style={nextButtonStyle} />
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

export default SignupEmail;
