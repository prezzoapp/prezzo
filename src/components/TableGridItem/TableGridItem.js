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
import { Entypo, FontAwesome, MaterialIcons } from '../VectorIcons';
import styles from './styles';
import OrderedItem from '../../components/OrderedItem';

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

  function itemSeparatorComponent() {
    return <View style={styles.separator} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userImageContainer}>
          <CacheImage
            style={styles.userImage}
            type='image'
            source={
              item.creator.avatarURL !== ''
                ? item.userImg
                : require('../../../assets/images/etc/default-avatar.png')
            }
          />
        </View>
        <Text style={styles.userName}>
          {item.creator.fullName} -{' '}
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
                        ? `${item.creator.fullName} - 9192`
                          : `${item.userName}`,
                      userImage: item.creator.avatarURL,
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
        keyExtractor={(item, index) => index.toString()}
        data={item.items}
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
