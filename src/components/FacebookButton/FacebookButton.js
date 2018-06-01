// @flow
import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import {FONT_FAMILY} from '../../services/constants';

type Props = {
  text: string,
  style: object
};

const login = () => {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      const permissions = result.grantedPermissions.toString();
      console.log(`Login success with permissions: ${permissions}`);
      console.log('result', result);
    }
  }, error => {
    console.log('Login fail with error: ' + error);
  });
};

const Button = ({style}: Props) => {
  const buttonStyle = {...styles.button, ...style};
  const textStyle = {...styles.text};
  const iconStyle = {...styles.icon};

  return (
    <TouchableOpacity
      onPress={() => login()}
      style={buttonStyle}
    >
      <Image
        style={iconStyle}
        source={require('../../../assets/images/icons/facebook.png')}
      />
      <Text style={textStyle}>
        Continue With Facebook
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    width: '100%',
    backgroundColor: 'rgba(58,159,249,0.81)',
    borderWidth: 2,
    borderColor: '#2074FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    paddingTop: 10,
    paddingBottom: 10
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 15
  }
};

export default Button;
