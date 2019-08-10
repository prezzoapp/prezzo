// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { Entypo } from '@expo/vector-icons'
import {
  FONT_FAMILY_MEDIUM
} from '../../services/constants';
import CacheImage from '../CacheImage';

class OpenTableItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const oldItems = this.props.data.get('items');
    const newItems = nextProps.data.get('items');
    const objectsAreSame = !oldItems.some(
      (item, index) => newItems.getIn([index, 'status']) !== item.get('status')
    );

    console.log(this.props.data.get('_id'));
    console.log(nextProps.data.get('_id'));

    if(
      nextProps.data.get('_id') !== this.props.data.get('_id') ||
      objectsAreSame === false ||
      nextProps.data.getIn(['creator', 'avatarURL']) !== this.props.data.getIn(['creator', 'avatarURL'])
    ) return true;
    return false;
  }

  render() {
    console.log('OpenTableItem component rerender!');
    const item = this.props.data;
    const tableNumber = item.getIn(['readableIdentifier']);
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
          this.props.onPress
            ? this.props.onPress()
            : this.props.navigate&& this.props.navigate({
              routeName:
                this.props.tabName === 'tables'
                  ? 'OpenTableDetails'
                  : 'VendorAdminActivityDetails',
              params: {
                userName:
                  this.props.tabName !== 'delivery'
                    ? `${item.getIn(['creator', 'fullName'])} - ${tableNumber}`
                    : `${item.get('userName')}`,
                userImage: item.getIn(['creator', 'avatarURL']),
                item: item,
                innerTab: this.props.innerTab,
            }
          })
        }
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
          {(() => {
            if (this.props.tabName === 'tables') {
              return (
                <View style={styles.statusContainer}>
                  <Text style={styles.tableId}>Table {tableNumber} </Text>
                  <Text style={[styles.statusText, { color: '#2ED573' }]}>
                    • Waiter Reqested
                  </Text>
                </View>
              );
            } else if(this.props.tabName === 'delivery') {
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
                        this.props.innerTabName !== 'photoReview' ? '#2ED573' : 'white'
                    }
                  ]}
                >
                  {this.props.innerTabName !== 'photoReview'
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
  }
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
