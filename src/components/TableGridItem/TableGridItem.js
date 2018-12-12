import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Entypo, FontAwesome, MaterialIcons } from '../VectorIcons';
import styles from './styles';
import OrderedItem from '../../components/OrderedItem';
import PropTypes from 'prop-types';
import { DELETE_ORDER, ACCEPT_ORDER } from '../../services/constants';

const TableGridItem = props => {
  const { item, index } = props.data;
  const { tableType } = props;
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
            props.checkAndChangeQueueOrderStatus(
              item._id,
              status === 'accept' ? 'active' : 'denied'
            );
        }}
      ],
      { cancelable: false }
    );
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={
            item.creator.avatarURL !== ''
              ? { uri: item.userImg }
              : require('../../../assets/images/etc/default-avatar.png')
          }
        />
        <Text style={styles.userName}>{item.creator.fullName} - Table 9192</Text>
        {tableType === 1 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => showAcceptDeniedAlert('denied')}
            >
              <FontAwesome name="trash-o" size={wp('5%')} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showAcceptDeniedAlert('accept')}>
              <MaterialIcons name="add" size={wp('5%')} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Entypo
            name="chevron-right"
            size={30}
            color="white"
            style={styles.arrow}
          />
        )}
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={item.items}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <OrderedItem data={item} />}
      />
    </View>
  );
};

export default TableGridItem;
