// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Entypo } from '../VectorIcons';

const OpenTableItem = props => {
  const { item, index } = props.data;  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigate({
          routeName: 'OpenTableDetails',
          params: { userName: item.userName }
        })
      }
    >
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
        {(() => {
          if (props.tabName === 'tables') {
            return (
              <View style={styles.statusContainer}>
                <Text style={styles.tableId}>Table {item.tableId}</Text>
                <Text style={styles.statusText}>• Waiter Reqested</Text>
              </View>
            );
          } else if(props.tabName === 'delivery') {
            return (
              <View style={styles.statusContainer}>
                <Text numberOfLines={1} style={[styles.tableId]}>
                  {item.address}
                </Text>
              </View>
            )
          }
        })()}
      </View>
      <View style={styles.arrow}>
        <Entypo name="chevron-right" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default OpenTableItem;
