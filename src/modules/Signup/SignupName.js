// @flow
import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import {FONT_FAMILY, FONT_FAMILY_MEDIUM, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import NextButton from './NextButton';

class SignupName extends React.Component {
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
    firstName: '',
    lastName: ''
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          What's your name?
        </Text>

        <LoginTextInput
          type='name'
          label='First Name'
          onChange={firstName => console.log('updated firstName', firstName)}
        />

        <LoginTextInput
          type='name'
          label='Last Name'
          onChange={lastName => console.log('updated lastName', lastName)}
        />

        <NextButton style={nextButtonStyle} />
      </ImageBackground>
    );
  }
}

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;

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
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
});

const nextButtonStyle = {
  alignSelf: 'flex-end'
};

export default SignupName;
