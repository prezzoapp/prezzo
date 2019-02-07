import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import styles from './styles';

const ActivityListItem = props => {
  function checkAndCancelOrderItem(orderId, itemId) {
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
          text: 'OK', onPress: () => props.checkStatusAndCancelItem(orderId, itemId)
        }
      ],
      { cancelable: false }
    );
  }

  if(props.item.status !== 'denied' || props.type === 'vendor') {
    return (
      <View style={styles.item}>
        <View style={styles.leftSide}>
          <Image
            source={
              props.item.status === 'complete'
                ? require('../../../assets/images/icons/active_status.png')
                : props.item.status === 'denied'
                  ? null
                  : require('../../../assets/images/icons/green_in_progress.png')
            }
            style={styles.statusImage}
          />
          <View style={styles.sideBorder} />
        </View>

        <View
          style={[
            styles.rightSide,
            { paddingRight: props.item.status === 'pending' ? wp('9%') : 0 }
          ]}
        >
          <Text style={styles.status}>
            {props.item.status.charAt(0).toUpperCase() + props.item.status.slice(1)}
          </Text>
          <Text style={styles.name}>{props.item.title}</Text>
          {props.item.notes !== '' &&
          props.item.notes !== undefined &&
          props.item.notes !== null ? (
            <Text style={styles.info}>{props.item.notes}</Text>
          ) : null}
          {props.item.status === 'pending' && props.innerTab === 'open' ? (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.editBtn}
              onPress={() =>
                checkAndCancelOrderItem(props.orderId, props.item._id)
              }
            >
              <Feather name="x" size={wp('6%')} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/*<View
          style={[
            styles.rightSide,
            { paddingRight: props.item.editable ? wp('9%') : 0 }
          ]}
        >
          <Text style={styles.status}>Delivered</Text>
          <Text style={styles.name}>{props.item.title}</Text>
          {props.item.notes !== '' &&
          props.item.notes !== undefined &&
          props.item.notes !== null ? (
            <Text style={styles.info}>{props.item.notes}</Text>
          ) : null}
          {props.item.editable ? (
            <TouchableOpacity activeOpacity={0.6} style={styles.editBtn}>
              <Image
                source={require('../../../assets/images/icons/edit.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>*/}
      </View>
    );
  }

  return null;
};

ActivityListItem.propTypes = {
  item: PropTypes.object.isRequired,
  checkStatusAndCancelItem: PropTypes.func.isRequired
};

export default ActivityListItem;
