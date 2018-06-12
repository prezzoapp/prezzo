// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Text, TextInput, View} from 'react-native';
import {FONT_FAMILY} from '../../services/constants';

type Props = {
  onChange: Function,
  label: string,
  type: 'name' | 'number',
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
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    value: ''
  };

  render() {
    const {onChange, label, placeholder, type, value} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <TextInput
            style={styles.value}
            autoCapitalize={type === 'name' ? 'words' : 'none'}
            onChangeText={text => onChange && onChange(text)}
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
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
    marginBottom: 10,
    width: 0.83 * screenWidth
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
    width: 0.3 * screenWidth
  },
  value: {
    color: valueTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: 18
  },
  valueContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#0DD24A',
    width: 0.44 * screenWidth
  }
};

export default ProfileTextInput;
