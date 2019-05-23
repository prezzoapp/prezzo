// @flow
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
      // `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
      `https://graph.facebook.com/me?access_token=${token}&fields=id`
    );

    const { id } = await response.json();
    this.props.onSuccess(id, token);
  }

  async login() {
    const { onStart, onSuccess, onFailure, onCancel } = this.props;
    onStart && onStart();
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '2029030444036230',
      {
        permissions: ['public_profile', 'email']
      }
    );
    if (type === 'success') {
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
        testID='facebookButton'
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
    backgroundColor: 'rgba(58,159,249,0.81)',
    borderWidth: 2,
    borderColor: '#2074FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('11.46%')
  },
  text: {
    color: 'white',
    fontSize: wp('4.8%'),
    fontWeight: '600',
    fontFamily: FONT_FAMILY
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
    marginRight: wp('3.73%')
  }
};

export default Button;
