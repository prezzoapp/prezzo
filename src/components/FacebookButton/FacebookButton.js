// @flow
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Facebook } from 'expo';
import { FONT_FAMILY } from '../../services/constants';

type Props = {
  text: string,
  style: object,
  disabled: boolean,
  onStart: Function,
  onSuccess: Function,
  onFailure: Function,
  onCancel: Function
};

class Button extends React.Component<Props> {
  async getUserData(token) {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);

    const { id } = await response.json();
    this.props.onSuccess(id, token);
  }

  async login() {
    const { onStart, onSuccess, onFailure, onCancel } = this.props;
    onStart && onStart();
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "2029030444036230",
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      this.getUserData(token);
    } else {
      return onCancel && onCancel();
    }
  }

  render() {
    const { style, disabled } = this.props;
    const buttonStyle = { ...styles.button, ...style };
    const textStyle = { ...styles.text };
    const iconStyle = { ...styles.icon };

    return (
      <TouchableOpacity
        testID={'facebookButton'}
        onPress={() => !disabled && this.login()}
        activeOpacity={disabled ? 1 : 0.7}
        style={buttonStyle}
      >
        <Image
          style={iconStyle}
          source={require('../../../assets/images/icons/facebook.png')}
        />
        <Text style={textStyle}>Continue With Facebook</Text>
      </TouchableOpacity>
    );
  }
}

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
