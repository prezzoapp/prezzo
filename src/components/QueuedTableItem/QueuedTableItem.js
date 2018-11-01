// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome, MaterialIcons } from '../VectorIcons';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../services/constants';

const QueuedTableItem = props => {
  const { item, index } = props.user;

  function renderQueuedList(status) {
    props.approveDenyOrder(item._id, status);
    props.listQueuedTable();
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={
          item.creator.avatarURL !== ''
            ? { uri: item.userImg }
            : require('../../../assets/images/etc/default-avatar.png')
        }
      />
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
        onPress={() => renderQueuedList('denied')}
      >
        <FontAwesome name="trash-o" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.add}
        onPress={() => renderQueuedList('active')}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QueuedTableItem;
