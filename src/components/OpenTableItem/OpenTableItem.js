// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Entypo } from '../VectorIcons';

const OpenTableItem = props => {
  const { item, index } = props.user;
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.userImage}
        source={
          item.userName !== ''
            ? { uri: item.userImg }
            : require('../../../assets/images/item4.png')
        }
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.userName}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.tableId}>Table {item.tableId}</Text>
          <Text style={styles.statusText}>• Waiter Reqested</Text>
        </View>
      </View>
      <View style={styles.arrow}>
        <Entypo name="chevron-right" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default OpenTableItem;
