// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontAwesome, MaterialIcons } from '../VectorIcons';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../services/constants';
import CacheImage from '../CacheImage';

const QueuedTableItem = props => {
  const item = props.data;

  function showAcceptDeniedAlert(status) {
    Alert.alert(
      status === 'accept' ? 'Accept' : 'Remove',
      `${item.getIn(['creator', 'fullName'])} \n Table 9192`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
          props.checkAndChangeQueueOrderStatus(item.get('_id'), status === 'accept' ? 'active' : 'denied');
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
          userName: `${item.getIn(['creator', 'fullName'])} - 9192`,
          userImage: item.getIn(['creator', 'avatarURL']),
          innerTab: props.innerTab,
          item: item
      }})}
    >
      <View style={styles.userImageContainer}>
        <CacheImage
          style={styles.userImage}
          type='image'
          source={
            item.getIn(['creator', 'avatarURL']) !== ''
              ? item.getIn(['creator', 'avatarURL'])
              : require('../../../assets/images/etc/default-avatar.png')
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.getIn(['creator', 'fullName'])}</Text>
        {props.tabName === 'tables' ? (
          <View style={styles.statusContainer}>
            <Text style={styles.tableId}>Table 9192</Text>
          </View>
        ): null}
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
