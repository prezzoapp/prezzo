// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { FONT_FAMILY } from '../../services/constants';

// type Props = {
//   text: string,
//   style: object,
//   textStyle: object
// };
type Props = {};

const Button = ({ disabled, onPress, style, textStyle, children }: Props) => {
  let newStyle = {};

  if(style instanceof Array) {
    newStyle = style.reduce((result, current) => {
      return Object.assign(result, current);
    }, {});
  } else {
    newStyle = { ...style };
  }

  const buttonStyleFinal = { ...styles.button, ...newStyle };
  const textStyleFinal = { ...styles.text, ...textStyle };

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

Button.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textStyle: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

Button.defaultProps = {
  disabled: false,
  style: {},
  textStyle: {}
};

export default Button;
