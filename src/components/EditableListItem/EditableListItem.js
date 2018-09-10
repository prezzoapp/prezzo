// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const EditableListItem = props => {
  const { onRemove, text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => onRemove && onRemove()}
      >
        <Image
          style={styles.icon}
          source={require('../../../assets/images/icons/remove.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

EditableListItem.propTypes = {
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default EditableListItem;
