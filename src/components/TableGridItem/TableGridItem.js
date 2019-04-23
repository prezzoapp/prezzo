import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Entypo, FontAwesome, MaterialIcons } from '../VectorIcons';
import styles from './styles';
import OrderedItem from '../OrderedItem';

const TableGridItem = props => {
  const item = props.data;
  const { tableType } = props;
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
            props.checkAndChangeQueueOrderStatus(
              item.get('_id'),
              status === 'accept' ? 'active' : 'denied'
            );
        }}
      ],
      { cancelable: false }
    );
  }

  function itemSeparatorComponent() {
    return <View style={styles.separator} />;
  }

  let newArray = List();
  item.get('items').forEach(obj => {
    if (!newArray.some(o => o.get('title') === obj.get('title'))) {
      const newObj = obj.set('quantity', 0);
      newArray = newArray.push(newObj);
    }
    newArray.map(o => {
      if (o.get('title') === obj.get('title')) {
        o.set('quantity', o.get('quantity') + 1);
        console.log(o.toObject());
      }
      return o;
    })
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={
              item.getIn(['creator', 'avatarURL']) !== ''
                ? { uri: item.getIn(['creator', 'avatarURL']) }
                : require('../../../assets/images/etc/default-avatar.png')
            }
          />
        </View>
        <Text style={styles.userName}>
          {item.getIn(['creator', 'fullName'])} -{' '}
          <Text style={styles.tableId}>Table 9192</Text>
        </Text>
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
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() =>
              props.onPress
                ? props.onPress()
                : props.navigate&& props.navigate({
                    routeName:
                      props.tabName === 'tables'
                      ? 'OpenTableDetails'
                        : 'VendorAdminActivityDetails',
                  params: {
                      userName:
                      props.tabName !== 'delivery'
                        ? `${item.getIn(['creator', 'fullName'])} - 9192`
                          : `${item.get('userName')}`,
                      userImage: item.getIn(['creator', 'avatarURL']),
                    item,
                      innerTab: props.innerTab
                    }
              })
            }
          >
            <Entypo name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        keyExtractor={item => item.get('_id').toString()}
        data={newArray.toArray()}
        ItemSeparatorComponent={() => itemSeparatorComponent()}
        contentContainerStyle={styles.itemImagesListStyle}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <OrderedItem data={item} />}
      />
    </View>
  );
};

export default TableGridItem;
