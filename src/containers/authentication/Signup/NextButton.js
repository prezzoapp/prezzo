// @flow
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

type State = {
  isBusy: boolean
};

type Props = {
  isBusy: boolean,
  onPress: Function,
  validate: Function,
  onError: Function,
  disabled: boolean,
  style: object
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

class Button extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: props.isBusy || false
    };
  }

  async _onPress() {
    const { onPress, onError, validate } = this.props;
    this.setState({ isBusy: true });
    try {
      if (validate) {
        await validate();
      }

      this.setState({ isBusy: false });
      onPress();
    } catch (e) {
      this.setState({ isBusy: false });
      if (onError) {
        onError(e);
      }
    }
  }

  render() {
    const isBusy = this.props.isBusy || this.state.isBusy;
    const { onPress, disabled, style } = this.props;
    const containerStyle = {
      ...styles.button,
      ...style,
      ...{
        // display: disabled ? 'none' : 'flex',
        opacity: disabled ? 0 : 1,
        backgroundColor: !isBusy ? styles.button.backgroundColor : '#DFE2E5'
      }
    };

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => !disabled && !isBusy && this._onPress()}
        activeOpacity={disabled ? 0.5 : 0.7}
        style={containerStyle}
      >
        <Image
          style={styles.icon}
          source={require('../../../../assets/images/icons/arrow-right.png')}
        />
      </TouchableOpacity>
    );
  }
}

export default Button;
