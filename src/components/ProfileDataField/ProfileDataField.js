// @flow
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

type Props = {
  label: String,
  value: String
};

const labelTextColor = '#A7A7A7';
const valueTextColor = 'white';
const screenWidth = Dimensions.get('window').width;

const ProfileDataField = ({ label, value }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentValueContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value} numberOfLines={1}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    marginBottom: hp('3.07%'),
    alignItems: 'center'
  },
  currentValueContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  label: {
    color: labelTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%')
  },
  labelContainer: {
    width: wp('31.33%'),
    marginRight: wp('1.86%')
  },
  value: {
    flex: 1,
    color: valueTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: wp('5.33%')
  },
  valueContainer: {
    flex: 1
  }
};

export default ProfileDataField;
