// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text, TextInput, View } from 'react-native';
import { FONT_FAMILY } from '../../services/constants';

const labelTextColor = '#A7A7A7';
const screenWidth = Dimensions.get('window').width;
const placeholderTextColor = '#A5A5A5';
const valueTextColor = 'white';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const ProfileTextInput = props => {
  const {
    onChange,
    label,
    placeholder,
    type,
    value,
    style,
    keyboardType,
    extraStyle
  } = props;
  const containerStyle = {
    ...styles.container,
    ...style
  };
  const valueContainerStyle = {
    ...styles.valueContainer,
    ...{
      paddingBottom: props.borderBottomWidth !== 0 ? hp('1.35%') : 0,
      borderBottomColor: props.borderBottomColor,
      borderBottomWidth: props.borderBottomWidth,
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
          underlineColorAndroid='transparent'
          style={[styles.value, { ...extraStyle }]}
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
    alignItems: 'flex-start',
    marginBottom: wp('5.33%'),
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  currentValueContainer: {
    flexDirection: 'row'
  },
  label: {
    color: labelTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    paddingTop: 2
  },
  labelContainer: {
    paddingTop: 0,
    width: wp('31.33%'),
    marginRight: wp('1.86%')
  },
  value: {
    color: valueTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%'),
    flex: 1
  },
  valueContainer: {
    flex: 1
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
  borderBottomWidth: PropTypes.number,
  keyboardType: PropTypes.string,
  extraStyle: PropTypes.object
};

ProfileTextInput.defaultProps = {
  showInputBottomBorder: true,
  style: {},
  value: '',
  showLabel: true,
  borderBottomColor: 'transparent',
  borderBottomWidth: 0,
  keyboardType: 'default',
  extraStyle: {}
};

export default ProfileTextInput;
