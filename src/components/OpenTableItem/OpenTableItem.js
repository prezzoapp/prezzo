// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { Entypo } from '../VectorIcons';
import {
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

const OpenTableItem = props => {
  const item = props.data;
  let itemImagesLength = 0;

  item.get('items').map(ele => {
    ele.get('imageURLs').map(image => {
      itemImagesLength += 1;
    });
  });

  return (
    <TouchableOpacity
      style={styles.container}
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
              item: item,
              innerTab: props.innerTab
          }
        })
      }
    >
      <View style={styles.userImageContainer}>
        <Image
          style={styles.userImage}
          type='image'
          source={
            item.getIn(['creator', 'avatarURL']) !== ''
              ? { uri: item.getIn(['creator', 'avatarURL']) }
              : require('../../../assets/images/etc/default-avatar.png')
          }
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.getIn(['creator', 'fullName'])}</Text>
        {(() => {
          if (props.tabName === 'tables') {
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
                    ? ' •  Waiter Reqested'
                    : <Text style={{ fontFamily: FONT_FAMILY_MEDIUM }}>- {itemImagesLength} Photo(s)</Text>}
                </Text>
              </View>
            );
          } else if(props.tabName === 'delivery') {
            return (
              <View style={styles.statusContainer}>
                <Text numberOfLines={1} style={[styles.tableId]}>
                  {item.get('address')}
                </Text>
              </View>
            )
          }
          return (
            <View style={styles.statusContainer}>
              <Text style={styles.tableId}>Table {item.get('tableId')}</Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      props.innerTab !== 'photoReview' ? '#2ED573' : 'white'
                  }
                ]}
              >
                {props.innerTab !== 'photoReview'
                  ? ' •  Waiter Reqested'
                  : <Text style={{ fontFamily: FONT_FAMILY_MEDIUM }}>- {itemImagesLength} Photo(s)</Text>}
              </Text>
            </View>
          );
        })()}
      </View>
      <View style={styles.arrow}>
        <Entypo name="chevron-right" size={wp('8%')} color="white" />
      </View>
    </TouchableOpacity>
  );
};

OpenTableItem.propTypes = {
  onPress: PropTypes.func,
  navigate: PropTypes.func,
  tabName: PropTypes.string.isRequired,
  innerTab: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

OpenTableItem.defaultProps = {
  onPress: null,
  navigate: null
};

export default OpenTableItem;
