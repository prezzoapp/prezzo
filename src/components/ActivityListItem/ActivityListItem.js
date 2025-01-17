import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import CacheImage from '../CacheImage';

class ActivityListItem extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.item.get('status') !== this.props.item.get('status')) return true;
    return false;
  }

  checkAndCancelOrderItem = itemId => {
    Alert.alert(
      '',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => this.props.checkStatusAndCancelItem(itemId)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const item = this.props.item;
    console.log(item.get('status'));
    if(item.get('status') !== 'denied' || this.props.type === 'vendor') {
      return (
        <View style={styles.item}>
          <View style={styles.leftSide}>
            <View style={styles.statusIconHolder}>
              <CacheImage
                type='image'
                source={
                item.get('status') === 'complete'
                    ? require('../../../assets/images/icons/active_status.png')
                  : item.get('status') === 'denied'
                    ? null
                    : require('../../../assets/images/icons/green_in_progress.png')
                }
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
      );
    }

    return null;
  }
};

ActivityListItem.propTypes = {
  item: PropTypes.object.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

export default ActivityListItem;
