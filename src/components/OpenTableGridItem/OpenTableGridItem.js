import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Entypo } from '../VectorIcons';
import styles from './styles';
import OrderedItem from '../../components/OrderedItem';

const OpenTableGridItem = props => {
  const { item, index } = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={require('../../../assets/images/item2.png')}
        />
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.tableId}>- Table {item.tableId}</Text>
        <Entypo
          name="chevron-right"
          size={30}
          color="white"
          style={styles.arrow}
        />
      </View>
      <FlatList
        data={[2, 4, 6, 7, 7, 7, 7, 8]}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={() => <OrderedItem />}
      />
      <View style={styles.seprator} />
    </View>
  );
};

export default OpenTableGridItem;
