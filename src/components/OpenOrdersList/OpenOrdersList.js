import React from 'react';
import { View, FlatList } from 'react-native';
import ActivityListItem from '../ActivityListItem';
import styles from './styles';

const OpenOrdersList = props => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        data={props.data}
        renderItem={({ item }) => <ActivityListItem item={item} />}
      />
      {props.footer}
    </View>
  );
}

export default OpenOrdersList;
