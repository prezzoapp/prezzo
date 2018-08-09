// @flow
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

type Props = {
  item: PropTypes.object.isRequired
};

export default (props: Props) => {
  const { item } = props;
  const { avatarURL, name } = item;

  return (
    <View style={{ marginBottom: 16 }}>
      <ImageBackground
        source={{ uri: avatarURL }}
        style={styles.image}
        imageStyle={{ borderRadius: 5 }}
      />

      <Text style={styles.restaurantName}>{name}</Text>
      <Text style={styles.cityName}>{item.city}</Text>
    </View>
  );
};
