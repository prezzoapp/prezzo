// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, TextInput, View} from 'react-native';
import {FONT_FAMILY} from '../../services/constants';

type Props = {
  onChange: Function,
  label: string,
  type: 'name' | 'number' | 'url',
  value: string
};

const labelTextColor = '#A7A7A7';
const screenWidth = Dimensions.get('window').width;
const placeholderTextColor = '#A5A5A5';
const valueTextColor = 'white';

class ProfileTextInput extends Component<Props> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    showInputBottomBorder: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    showLabel: PropTypes.bool,
    borderBottomColor: PropTypes.string,
    keyboardType: PropTypes.string
  };

  static defaultProps = {
    showInputBottomBorder: true,
    style: {},
    value: '',
    showLabel: true,
    borderBottomColor: 'transparent',
    keyboardType: 'default'
  };

  render() {
    const {
      onChange,
      label,
      placeholder,
      type,
      value,
      showInputBottomBorder,
      style,
      keyboardType
    } = this.props;
    const containerStyle = {
      ...styles.container,
      ...style
    };
    const valueContainerStyle = {
      ...styles.valueContainer,
      ...{
        borderBottomColor: this.props.borderBottomColor
      }
    };

    return (
      <View style={containerStyle}>
        {(this.props.showLabel) ? (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        ) : ( null )}
        <View style={valueContainerStyle}>
          <TextInput
            style={styles.value}
            autoCapitalize={type === 'name' ? 'words' : 'none'}
            onChangeText={text => onChange && onChange(text)}
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    height: 0.1 * screenWidth,
    marginTop: 5,
    width: 0.85 * screenWidth
  },
  currentValueContainer: {
    flexDirection: 'row',
    width: 0.49 * screenWidth
  },
  label: {
    color: labelTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: 15
  },
  labelContainer: {
    flex: 1,
    paddingTop: 3
  },
  value: {
    color: valueTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: 18
  },
  valueContainer: {
    borderBottomWidth: 2,
    flex: 1.8
  }
};

export default ProfileTextInput;
