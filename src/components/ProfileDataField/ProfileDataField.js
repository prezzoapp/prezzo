// @flow
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {FONT_FAMILY} from '../../services/constants';

type Props = {};

const labelTextColor = '#A7A7A7';
const valueTextColor = 'white';
const screenWidth = Dimensions.get('window').width;

const ProfileDataField = ({label, value}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentValueContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    height: 0.1 * screenWidth,
    marginTop: 5,
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
    width: 0.44 * screenWidth
  }
};

export default ProfileDataField;
