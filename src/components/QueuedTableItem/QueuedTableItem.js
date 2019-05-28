// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../services/constants';
import CacheImage from '../CacheImage';

const QueuedTableItem = props => {
  const { item, index } = props.data;
  console.log(item);

  function showAcceptDeniedAlert(status) {
    Alert.alert(
      status === 'accept' ? 'Accept' : 'Remove',
      `${item.creator.fullName} \n Table 9192`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
          props.checkAndChangeQueueOrderStatus(item._id, status === 'accept' ? 'active' : 'denied');
        }}
      ],
      { cancelable: false }
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigate &&
        props.navigate({ routeName: 'OpenTableDetails',
        params: {
          userName: `${item.creator.fullName} - 9192`,
          userImage: item.creator.avatarURL,
          innerTab: props.innerTab,
          item: item
      }})}
    >
      <View style={styles.userImageContainer}>
        <CacheImage
          style={styles.userImage}
          type='image'
          source={
            item.creator.avatarURL !== ''
              ? item.creator.avatarURL
              : require('../../../assets/images/etc/default-avatar.png')
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.creator.fullName}</Text>
        {(() => {
          if (props.tabName === 'tables') {
            return (
              <View style={styles.statusContainer}>
                <Text style={styles.tableId}>Table 9192</Text>
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
      <TouchableOpacity
        style={styles.delete}
        onPress={() => showAcceptDeniedAlert('denied')}
      >
        <FontAwesome name="trash-o" size={wp('5%')} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.add}
        onPress={() => showAcceptDeniedAlert('accept')}
      >
        <MaterialIcons name="add" size={wp('5%')} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default QueuedTableItem;
