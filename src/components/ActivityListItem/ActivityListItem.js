import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';

const ActivityListItem = props => (
  <View style={styles.item}>
    <View style={styles.leftSide}>
      <Image
        source={
          props.item.status === 'Delivered'
            ? require('../../../assets/images/icons/active_status.png')
            : require('../../../assets/images/icons/green_in_progress.png')
        }
        style={styles.statusImage}
      />
      <View style={{ flex: 1, width: 1, backgroundColor: '#EFEFF4' }} />
    </View>

    <View
      style={[
        styles.rightSide,
        { paddingRight: props.item.status === 'In Progress' ? wp('9%') : 0 }
      ]}
    >
      <Text style={styles.status}>{props.item.status}</Text>
      <Text style={styles.name}>{props.item.name}</Text>
      {props.item.info !== '' &&
      props.item.info !== undefined &&
      props.item.info !== null ? (
        <Text style={styles.info}>{props.item.info}</Text>
      ) : null}
      {props.item.status === 'In Progress' ? (
        <TouchableOpacity activeOpacity={0.6} style={styles.editBtn}>
          <Image
            source={require('../../../assets/images/icons/edit.png')}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

ActivityListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ActivityListItem;
