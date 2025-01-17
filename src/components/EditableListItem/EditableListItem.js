// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import showGenericAlert from '../GenericAlert';
import CacheImage from '../CacheImage';

const EditableListItem = props => {
  const { onRemove, text, leftIcon, expDate } = props;

  return (
    <View
    style={[
        styles.container,
        {
          paddingHorizontal: leftIcon != null ? wp('2.93%') : 0
        }
      ]}
    >
      {(() => {
        if(leftIcon) {
          return leftIcon;
        }
        return null;
      })()}
      <Text style={styles.text}>{text}</Text>

      {(() => {
        if(expDate) {
          return (
            <Text style={[styles.expDate, { marginLeft: 0 }]}>{expDate}</Text>
          );
        }
        return null;
      })()}

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          showGenericAlert(
            null,
            'Are you sure you want to remove?',
            [
              {
                text: 'Yes',
                onPress: () => onRemove && onRemove()
              },
              {
                text: 'No',
                onPress: () => null,
                style: 'cancel'
              }
            ]
          );
        }}
      >
        <CacheImage
          style={styles.icon}
          type='image'
          source={require('../../../assets/images/icons/remove.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

EditableListItem.propTypes = {
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  leftIcon: PropTypes.object,
  expDate: PropTypes.string
};

EditableListItem.defaultProps = {
  leftIcon: null,
  expDate: null
};

export default EditableListItem;
