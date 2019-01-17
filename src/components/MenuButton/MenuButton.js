// @flow
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '../VectorIcons';
import PropTypes from 'prop-types'
import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const buttonBlack = '#424242';
const shadowColor = 'black';
const textColor = 'white';

const MenuButton = ({ leftIcon, icon, onPress, title, subtitle }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={styles.buttonContainer}>
        {(() => {
          if(leftIcon) {
            return (
              <View style={[styles.buttonActionContainer,{ marginLeft: 10 }]}>
                {leftIcon}
              </View>
            );
          }
          return null;
        })()}
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>{title}</Text>
          {!!subtitle && <Text style={styles.buttonSubtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.buttonActionContainer}>
          <MaterialIcons name={icon} size={wp('10.66%')} color='white'/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonActionContainer: {
    alignItems: 'center',
    flex: 0.15,
    justifyContent: 'center'
  },
  buttonContainer: {
    // width: 0.85 * Dimensions.get('window').width,
    width: '100%',
    backgroundColor: buttonBlack,
    borderRadius: 6,
    height: 0.20 * 0.85 * Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.23%'),
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.4
  },
  buttonTextContainer: {
    flex: 0.85,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10
  },
  buttonSubtitle: {
    color: textColor,
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY),
    fontSize: wp('3.2%')
  },
  buttonTitle: {
    color: textColor,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('4.8%')
  }
};

MenuButton.propTypes = {
  leftIcon: PropTypes.object,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

MenuButton.defaultProps = {
  leftIcon: null,
  subtitle: ''
};

export default MenuButton;
