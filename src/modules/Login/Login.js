// @flow
import React from 'react';
import {ImageBackground, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FONT_FAMILY, FONT_FAMILY_BOLD} from '../../services/constants';
import LoginTextInput from '../../components/LoginTextInput';
import Button from '../../components/Button';

type Props = {
  navigate: PropTypes.func.isRequired
};

type State = {
  email: string,
  password: string
};

class Login extends React.Component<Props, State> {
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
    password: ''
  };

  navigateToSignup() {
    this.props.navigate({routeName: 'SignupName'});
  }

  navigateToMain() {
    this.props.navigate({routeName: 'Main'});
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          Welcome back!
        </Text>

        <Text style={styles.subHeaderText}>
          Sign In To Continue
        </Text>

        <LoginTextInput
          type='email'
          label='Email Address'
          onChange={email => console.log('updated email', email)}
        />

        <LoginTextInput
          type='password'
          label='Password'
          onChange={password => console.log('updated password', password)}
        />

        <TouchableOpacity
          style={styles.signupLabelContainer}
          onPress={() => this.navigateToSignup()}
        >
          <Text style={styles.signupLabel}>
            Don't have an account?
          </Text>

          <Text style={styles.signupLink}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button style={buttonStyles.login} textStyle={buttonStyles.loginText}>
            Sign In
          </Button>
        </View>
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
    backgroundColor: 'transparent'
  },
  subHeaderText: {
    fontSize: 24,
    fontFamily: FONT_FAMILY,
    color: '#fff',
    marginBottom: 40,
    backgroundColor: 'transparent'
  },
  signupLabelContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 40,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    display: 'flex'
  },
  signupLabel: {
    color: '#959595',
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    marginRight: 4
  },
  signupLink: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT_FAMILY
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center'
  }
});

const buttonStyles = {
  login: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },
  loginText: {

  }
};

export default Login;
