// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';
import { Entypo } from '../VectorIcons';
import {
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

class OpenTableItem extends Component {
  render() {
    const { item, index } = this.props.data;
    let itemImagesLength = 0;

    item.items.map(ele => {
      ele.imageURLs.map(image => {
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
                    ? `${item.creator.fullName} - 9192`
                    : `${item.userName}`,
                userImage: item.creator.avatarURL,
                item: item,
                innerTab: this.props.innerTab,
            }
          })
        }
      >
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={
              item.creator.avatarURL !== ''
                ? { uri: item.creator.avatarURL }
                : require('../../../assets/images/etc/default-avatar.png')
            }
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{item.creator.fullName}</Text>
          {(() => {
            if (this.props.tabName === 'tables') {
              return (
                <View style={styles.statusContainer}>
                  <Text style={styles.tableId}>Table 9192 </Text>
                  <Text style={[styles.statusText, { color: '#2ED573' }]}>
                    • Waiter Reqested
                  </Text>
                </View>
              );
            } else if(this.props.tabName === 'delivery') {
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

export default OpenTableItem;
