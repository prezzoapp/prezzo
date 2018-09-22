// @flow
import React from 'react';
import {ImageBackground, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FONT_FAMILY, FONT_FAMILY_BOLD} from '../../../services/constants';
import LoginTextInput from '../../../components/LoginTextInput';
import Button from '../../../components/Button';

type Props = {
  loginWithEmail: Function,
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
    this.props.navigate({ routeName: 'SignupName' });
  }

  navigateToMain() {
    this.props.navigate({ routeName: 'Customer' });
  }

  login() {
    const {email, password} = this.state;
    this.props.loginWithEmail(email, password)
      .then(() => this.navigateToMain())
      .catch(e => console.log(e));
  }

  render() {
    const {email, password} = this.state;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
      >
        <Text testID={'welcomeText'} style={styles.headerText}>
          Welcome back!
        </Text>

        <Text testID={'signinText'}  style={styles.subHeaderText}>
          Sign In To Continue
        </Text>

        <LoginTextInput
          type='email'
          label='Email Address'
          value={email}
          onChange={email => this.setState({email})}
        />

        <LoginTextInput
          type='password'
          label='Password'
          value={password}
          onChange={password => this.setState({password})}
        />

        <TouchableOpacity
          testId={'signupButton'}
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
          <Button
            style={buttonStyles.login}
            textStyle={buttonStyles.loginText}
            onPress={() => this.login()}
          >
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
