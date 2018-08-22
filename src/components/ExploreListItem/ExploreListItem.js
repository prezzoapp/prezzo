// @flow
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

type Props = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};

export default (props: Props) => {
  const { item } = props;
  const { avatarURL, name } = item;

  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => props.navigate({ routeName: 'RestaurantDetails' })}
      >
        <ImageBackground
          source={{ uri: avatarURL }}
          style={styles.image}
          imageStyle={{ borderRadius: 5 }}
        />
      </TouchableOpacity>

      <Text style={styles.restaurantName}>{name}</Text>
      <Text style={styles.cityName}>{item.city}</Text>
    </View>
  );
};
