// @flow
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

type Props = {
  onPress: Function,
  disabled: boolean,
  style: object
};

const Button = ({onPress, disabled, style}: Props) => {
  const containerStyle = {
    ...styles.button,
    ...style,
    ...{
      display: disabled ? 'none' : 'flex'
    }
  };

  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress && onPress()}
      activeOpacity={disabled ? 0.5 : 0.7}
      style={containerStyle}
    >
      <Image
        style={styles.icon}
        source={require('../../../assets/images/icons/arrow-right.png')}
      />
    </TouchableOpacity>
  );
};

const buttonSize: number = 40;

const styles = {
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#0DD24A',
    borderRadius: buttonSize / 2,
    position: 'relative'
  },
  icon: {
    width: buttonSize / 2.5,
    height: buttonSize / 2.5,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -1 * (buttonSize / 5),
    marginTop: -1 * (buttonSize / 5),
    resizeMode: 'contain'
  }
};

export default Button;
