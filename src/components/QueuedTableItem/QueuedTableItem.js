// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { FontAwesome, MaterialIcons } from '../VectorIcons';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../services/constants';
import CacheImage from '../CacheImage';
import styles from './styles';

class QueuedTableItem extends Component {
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
      nextProps.data.getIn(['creator', 'avatarURL']) !== this.props.data.getIn(['creator', 'avatarURL'])
    ) return true;
    return false;
  }

  showAcceptDeniedAlert = status => {
    const item = this.props.data;
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
          this.props.checkAndChangeQueueOrderStatus(item.get('_id'), status === 'accept' ? 'active' : 'denied');
        }}
      ],
      { cancelable: false }
    );
  };

  render() {
    console.log('QueuedTableItem component render called!');
    const item = this.props.data;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigate &&
          this.props.navigate({ routeName: 'OpenTableDetails',
          params: {
            userName: `${item.getIn(['creator', 'fullName'])} - 9192`,
            userImage: item.getIn(['creator', 'avatarURL']),
            innerTab: this.props.innerTab,
            item: item
        }})}
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
          {this.props.tabName === 'tables' ? (
            <View style={styles.statusContainer}>
              <Text style={styles.tableId}>Table 9192</Text>
            </View>
          ): null}
        </View>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => this.showAcceptDeniedAlert('denied')}
        >
          <FontAwesome name="trash-o" size={wp('5%')} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.add}
          onPress={() => this.showAcceptDeniedAlert('accept')}
        >
          <MaterialIcons name="add" size={wp('5%')} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
};

QueuedTableItem.propTypes = {
  data: PropTypes.object.isRequired,
  checkAndChangeQueueOrderStatus: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  innerTab: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired
};

export default QueuedTableItem;
