import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import CacheImage from '../CacheImage';
import styles from './styles';

class MyHistoryItem extends Component {
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
    return (
      <View style={styles.item}>
        <View style={styles.leftSide}>
          <View style={styles.statusIconHolder}>
            <CacheImage
              source={require('../../../assets/images/icons/active_status.png')}
              type='image'
              style={styles.statusImage}
            />
          </View>
          <View style={styles.sideBorder} />
        </View>

        <View
          style={styles.rightSide}
        >
          <Text style={styles.status}>
            {item.date}
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {item.restaurantName}
          </Text>
          <Text style={styles.info} numberOfLines={1}>
            {item.type}
          </Text>
        </View>
      </View>
    );
  }
};

MyHistoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

export default MyHistoryItem;
