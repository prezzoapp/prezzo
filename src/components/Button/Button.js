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

const Button = ({ disabled, onPress, style, textStyle, children }: Props) => {
  const buttonStyleFinal = {...styles.button, ...style};
  const textStyleFinal = {...styles.text, ...textStyle};

  // if(children.type !== undefined)
  // console.log(children.type.name)

  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress && onPress()}
      activeOpacity={disabled ? 1 : 0.7}
      style={buttonStyleFinal}
    >
      {children.type !== undefined && children.type.name === 'View' ? (
        children
      ) : (
        <Text style={textStyleFinal}>{children}</Text>
      )}
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
    width: '100%',
    backgroundColor: 'rgba(58,159,249,0.81)',
    borderWidth: 2,
    borderColor: '#2074FF',
    borderRadius: 10
  }
};

export default Button;
