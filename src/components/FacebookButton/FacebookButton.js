// @flow
import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {FONT_FAMILY} from '../../services/constants';

type Props = {
  text: string,
  style: object
};

const Button = ({onPress, style}: Props) => {
  const buttonStyle = {...styles.button, ...style};
  const textStyle = {...styles.text};
  const iconStyle = {...styles.icon};

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
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
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
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
