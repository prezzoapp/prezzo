// @flow
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FONT_FAMILY} from '../../services/constants';

// type Props = {
//   text: string,
//   style: object,
//   textStyle: object
// };
type Props = {};

const Button = ({onPress, style, textStyle, children}: Props) => {
  const buttonStyleFinal = {...styles.button, ...style};
  const textStyleFinal = {...styles.text, ...textStyle};

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={buttonStyleFinal}
    >
      <Text style={textStyleFinal}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(58,159,249,0.81)',
    borderWidth: 2,
    borderColor: '#2074FF',
    borderRadius: 10
  }
};

export default Button;
