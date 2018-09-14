// @flow
import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {updateFirstName, updateLastName} from '../../../modules/Signup';
import {FONT_FAMILY_BOLD} from '../../../services/constants';
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
  navigation: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0
  }
});

const nextButtonStyle = {
  alignSelf: 'flex-end'
};

class SignupName extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: styles.navigation,
    headerTintColor: '#fff'
  };

  isFormValid() {
    const {firstName, lastName} = this.props;
    return firstName && lastName ? true : false;
  }

  navigateToSignupEmail() {
    this.props.navigate({routeName: 'SignupEmail'});
  }

  render() {
    const {firstName, lastName} = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
      >
        <Text style={styles.headerText}>
          What's your name?
        </Text>

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
          validate={() =>
            new Promise(resolve => {
              setTimeout(resolve, 1000);
            })
          }
          onPress={() => this.navigateToSignupEmail()}
          onError={e => console.log('error validating next', e)}
          disabled={!this.isFormValid()}
        />
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
