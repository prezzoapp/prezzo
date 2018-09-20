import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import ActivityListItem from '../ActivityListItem';
import styles from './styles';

const ActivityHistoryTab = props => (
  <View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      data={props.item.data}
      renderItem={({ item }) => <ActivityListItem item={item} />}
    />
    <View style={styles.footer}>
      <View style={styles.textHolder}>
        <Text style={styles.text}>SUBTOTAL</Text>
        <Text style={[styles.text, styles.price]}>${props.item.subTotal}</Text>
      </View>

      <View style={[styles.textHolder, styles.extraStyle]}>
        <Text style={styles.text}>Tax</Text>
        <Text style={[styles.text, styles.price]}>${props.item.tax}</Text>
      </View>

      <View style={styles.textHolder}>
        <Text style={styles.text}>Total Paid</Text>
        <Text style={[styles.text, styles.price]}>
          $
          {(
            props.item.subTotal +
            (props.item.subTotal * props.item.tax) / 100
          ).toFixed(2)}
        </Text>
      </View>
    </View>
  </View>
);

ActivityHistoryTab.propTypes = {
  item: PropTypes.object.isRequired
};

export default ActivityHistoryTab;
