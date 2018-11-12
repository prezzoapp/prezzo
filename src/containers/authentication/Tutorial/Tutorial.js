// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import TutorialScreen from './TutorialScreen';
import Button from '../../../components/Button';
import FacebookButton from '../../../components/FacebookButton';
import { FONT_FAMILY } from '../../../services/constants';
import { getUserInfo } from '../../../services/facebook';

const images = {
  tutorial1: require('../../../../assets/images/tutorial/tutorial-1.png'),
  tutorial2: require('../../../../assets/images/tutorial/tutorial-2.png'),
  tutorial3: require('../../../../assets/images/tutorial/tutorial-3.png'),
  tutorial4: require('../../../../assets/images/tutorial/tutorial-4.png')
};

class Tutorial extends React.Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  state = {
    isBusy: false
  };

  async onFacebookLogin(facebookId, accessToken) {
    try {
      await this.props.loginWithFacebook(facebookId, accessToken);
      this.navigateToHome();
    } catch (e) {
      if (e && e.code === 404) {
        console.log('user not found');
      }

      try {
        // update info so signup screens have access to facebook info
        // const { email, firstName, lastName, avatarURL } = await getUserInfo();
        const { email, firstName, lastName, avatarURL } = await getUserInfo(accessToken);

        if (email) {
          this.props.updateEmail(email);
        }

        if (firstName) {
          this.props.updateFirstName(firstName);
        }

        if (lastName) {
          this.props.updateLastName(lastName);
        }

        if (avatarURL) {
          this.props.updateAvatarURL(avatarURL);
        }

        this.props.updateFacebookId(facebookId);
        this.props.updateFacebookToken(accessToken);

        // check if user exists with email
        const user = await this.props.findUser(email);
        this.setState({ isBusy: false });

        if (user) {
          this.navigateToSignupMergeFacebook();
        } else {
          this.navigateToSignup();
        }
      } catch (error) {
        console.log('error getting facebook data', error);
        this.setState({ isBusy: false });
        this.navigateToSignup();
      }
    }
  }

  navigateToSignupMergeFacebook() {
    this.props.navigate({ routeName: 'SignupMergeFacebook' });
  }

  navigateToHome() {
    this.props.navigate({ routeName: 'Customer' });
  }

  navigateToLogin() {
    this.props.navigate({ routeName: 'Login' });
  }

  navigateToSignup() {
    this.props.navigate({ routeName: 'SignupName' });
  }

  navigateToEnableNotifications() {
    this.props.navigate({ routeName: 'EnableNotifications' });
  }

  render() {
    const { isBusy } = this.state;

    return (
      <View style={styles.container}>
        <Swiper
          testID="swiper"
          loop={false}
          dotColor="rgba(255, 255, 255, 0.5)"
          activeDotColor="#0DD24A"
        >
          <TutorialScreen image={images.tutorial1} />
          <TutorialScreen image={images.tutorial2} />
          <TutorialScreen image={images.tutorial3} />
          <TutorialScreen image={images.tutorial4} />
        </Swiper>
        <View style={styles.header}>
          <TouchableOpacity
            testID="loginButton"
            onPress={() => this.navigateToLogin()}
          >
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <FacebookButton
            testID="facebookButton"
            disabled={isBusy}
            style={buttonStyles.facebookButton}
            onStart={() => this.setState({ isBusy: true })}
            onFailure={() => this.setState({ isBusy: false })}
            onCancel={() => this.setState({ isBusy: false })}
            onSuccess={(facebookId, accessToken) => {
              this.onFacebookLogin(facebookId, accessToken);
            }}
          />
          <Button
            testID="signupButton"
            disabled={isBusy}
            style={buttonStyles.createAccountButton}
            onPress={() => this.navigateToEnableNotifications()}
          >
            Create Account
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  header: {
    position: 'absolute',
    top: '5%',
    right: 0,
    width: '100%',
    height: '20%'
  },
  footer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    width: '100%',
    height: '20%'
  },
  login: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    letterSpacing: 0,
    marginRight: 20,
    color: '#fff',
    alignSelf: 'flex-end'
  }
});

const buttonStyles = {
  facebookButton: {
    width: '90%',
    marginLeft: 20,
    marginRight: 20
  },
  createAccountButton: {
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#fff'
  }
};

export default Tutorial;
