// @flow
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const labelTextColor = '#A7A7A7';
const valueTextColor = 'white';
const screenWidth = Dimensions.get('window').width;

const ProfileDataField = ({ label, value, extraStyle }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentValueContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={[styles.valueContainer, { ...extraStyle }]}>
          <Text style={styles.value} numberOfLines={2}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    marginBottom: hp('3.07%')
  },
  currentValueContainer: {
    flexDirection: 'row',
    flex: 1
  },
  label: {
    color: labelTextColor,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.53%'),
    paddingTop: 2
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

ProfileDataField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  extraStyle: PropTypes.object
};

ProfileDataField.defaultProps = {
  label: '',
  value: '',
  extraStyle: {}
};

export default ProfileDataField;
