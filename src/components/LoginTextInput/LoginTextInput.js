// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR } from '../../services/constants';

type Props = {
  onChange: Function,
  label: string,
  type: 'name' | 'email' | 'password',
  value: string
};

type State = {
  isShowingPassword: boolean
};

class LoginTextInput extends Component<Props, State> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    height: PropTypes.number,
    labelPaddingBottom: PropTypes.number,
    textInputPaddingBottom: PropTypes.number
  };

  static defaultProps = {
    value: '',
    height: null,
    labelPaddingBottom: wp('3%'),
    textInputPaddingBottom: wp('3%')
  };

  state = {
    isShowingPassword: false
  };

  togglePasswordVisibility() {
    const isShowingPassword = !this.state.isShowingPassword;
    this.setState({ isShowingPassword });
  }

  render() {
    const { onChange, label, type, value, height, labelPaddingBottom, textInputPaddingBottom } = this.props;
    const { isShowingPassword } = this.state;

    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { paddingBottom: labelPaddingBottom }]}>{label}</Text>
          {type === 'password' && (
            <TouchableOpacity onPress={() => this.togglePasswordVisibility()}>
              <Text style={styles.togglePasswordVisibility}>
                {isShowingPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TextInput
          testID={'loginTextInput'}
          underlineColorAndroid='transparent'
          style={[styles.input, { paddingBottom: textInputPaddingBottom }]}
          secureTextEntry={type === 'password' && !isShowingPassword}
          autoCapitalize={type === 'name' ? 'words' : 'none'}
          onChangeText={text => onChange && onChange(text)}
          autoCorrect={false}
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    marginBottom: wp('8.53%'),
    borderBottomWidth: 2,
    borderBottomColor: '#0DD24A',
    backgroundColor: 'transparent'
  },
  labelContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    color: '#959595',
    fontSize: wp('4.53%'),
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    lineHeight: wp('5.86%')
  },
  togglePasswordVisibility: {
    color: '#959595',
    fontSize: wp('4.53%'),
    fontWeight: '600',
    fontFamily: FONT_FAMILY
  },
  input: {
    color: 'white',
    fontSize: wp('5.33%'),
    fontWeight: '600',
    fontFamily: FONT_FAMILY_MEDIUM
  }
});

export default LoginTextInput;
