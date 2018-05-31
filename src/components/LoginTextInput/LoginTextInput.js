// @flow
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {FONT_FAMILY, FONT_FAMILY_MEDIUM} from '../../services/constants';

type Props = {
  onChange: Function,
  label: string,
  type: 'name' | 'email' | 'password'
};

const LoginTextInput = ({onChange, label, type}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChange && onChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#0DD24A',
    backgroundColor: 'transparent'
  },
  label: {
    color: '#959595',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    paddingBottom: 10
  },
  input: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10
  }
});

export default LoginTextInput;
