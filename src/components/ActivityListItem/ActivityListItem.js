import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import CacheImage from '../CacheImage';
import styles from './styles';
import showGenericAlert from '../GenericAlert';

const ActivityListItem = props => {
  function checkAndCancelOrderItem(orderId, itemId) {
    showGenericAlert(null, 'Are you sure you want to cancel?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => props.checkStatusAndCancelItem(orderId, itemId)
      }
    ]);
  }

  render() {
    const item = this.props.item;
    console.log(item.get('status'));
    if(item.get('status') !== 'denied' || this.props.type === 'vendor') {
      return (
        <View style={styles.item}>
          <View style={styles.leftSide}>
            <View style={styles.statusIconHolder}>
              <CacheImage
                source={
                item.get('status') === 'complete'
                    ? require('../../../assets/images/icons/active_status.png')
                  : item.get('status') === 'denied'
                    ? null
                    : require('../../../assets/images/icons/green_in_progress.png')
                }
                type='image'
                style={styles.statusImage}
              />
            </View>
            <View style={styles.sideBorder} />
          </View>

          <View
            style={[
              styles.rightSide,
              { paddingRight: item.get('status') === 'pending' ? wp('9%') : 0 }
            ]}
          >
            <Text style={styles.status}>
              {item.get('status').charAt(0).toUpperCase() + item.get('status').slice(1)}
            </Text>
            <Text style={styles.name} numberOfLines={2}>
              {item.get('title')}
            </Text>
            {item.get('notes') !== '' &&
            item.get('notes') !== undefined &&
            item.get('notes') !== null ? (
              <Text style={styles.info} numberOfLines={3}>
                {item.get('notes')}
              </Text>
            ) : null}
            {item.get('status') === 'pending' && this.props.innerTab === 'open' ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.editBtn}
                onPress={() => this.checkAndCancelOrderItem(item.get('_id'))}
              >
                <Feather name="x" size={wp('6%')} color="white" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
};

ActivityListItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string,
  innerTab: PropTypes.string,
  orderId: PropTypes.string.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

ActivityListItem.defaultProps = {
  type: '',
  innerTab: 'open'
};

export default ActivityListItem;
