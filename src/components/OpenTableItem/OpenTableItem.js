// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Entypo } from '../VectorIcons';

const OpenTableItem = props => {
  const { item, index } = props.data;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigate&& props.navigate({
          routeName:
            props.tabName === 'tables'
              ? 'OpenTableDetails'
              : props.tabName === 'delivery'
                ? 'OpenDeliveryDetails'
                : 'VendorAdminActivityDetails',
          params: {
            userName:
              props.tabName !== 'delivery'
                ? `${item.creator.fullName} - 9192`
                : `${item.userName}`,
            userImage: item.creator.avatarURL,
            item: props.tabName === 'tables' ? item : null,
            changeOrderStatus: props.tabName === 'tables' ? props.changeOrderStatus : null
          }
        })
      }
    >
      <Image
        style={styles.userImage}
        source={
          item.creator.avatarURL !== ''
            ? { uri: item.creator.avatarURL }
            : require('../../../assets/images/etc/default-avatar.png')
        }
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.creator.fullName}</Text>
        {(() => {
          if (props.tabName === 'tables') {
            return (
              <View style={styles.statusContainer}>
                <Text style={styles.tableId}>Table 9192 </Text>
                <Text style={[styles.statusText, { color: '#2ED573' }]}>
                  • Waiter Reqested
                </Text>
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
          return (
            <View style={styles.statusContainer}>
              <Text style={styles.tableId}>Table {item.tableId}</Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      props.innerTabName !== 'photoReview' ? '#2ED573' : 'white'
                  }
                ]}
              >
                {props.innerTabName !== 'photoReview'
                  ? '  •  Waiter Reqested'
                  : ` - ${item.items.length} Photos`}
              </Text>
            </View>
          );
        })()}
      </View>
      <View style={styles.arrow}>
        <Entypo name="chevron-right" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default OpenTableItem;
