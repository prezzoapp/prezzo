// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text, TextInput, View } from 'react-native';
import { FONT_FAMILY } from '../../services/constants';

const labelTextColor = '#A7A7A7';
const screenWidth = Dimensions.get('window').width;
const placeholderTextColor = '#A5A5A5';
const valueTextColor = 'white';

const ProfileTextInput = props => {
  const {
    onChange,
    label,
    placeholder,
    type,
    value,
    style,
    keyboardType
  } = props;
  const containerStyle = {
    ...styles.container,
    ...style
  };
  const valueContainerStyle = {
    ...styles.valueContainer,
    ...{
      borderBottomColor: props.borderBottomColor
    }
  };

  return (
    <View style={containerStyle}>
      {props.showLabel ? (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : null}
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

ProfileTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  showInputBottomBorder: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  showLabel: PropTypes.bool,
  borderBottomColor: PropTypes.string,
  keyboardType: PropTypes.string
};

ProfileTextInput.defaultProps = {
  showInputBottomBorder: true,
  style: {},
  value: '',
  showLabel: true,
  borderBottomColor: 'transparent',
  keyboardType: 'default'
};

export default ProfileTextInput;
