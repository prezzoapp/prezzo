import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '../VectorIcons';
import styles from './styles';
import OrderedItem from '../../components/OrderedItem';
import PropTypes from 'prop-types';
import { DELETE_ORDER, ACCEPT_ORDER } from '../../services/constants';

const TableGridItem = props => {
  const { item, index } = props.data;
  const { tableType } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={require('../../../assets/images/item2.png')}
        />
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.tableId}>- Table {item.tableId}</Text>
        {tableType === 1 ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.delete}
              onPress={() =>
                props.handleQueuedTableItem(item.id, index, DELETE_ORDER)
              }
            >
              <FontAwesome name="trash-o" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.handleQueuedTableItem(item.id, index, ACCEPT_ORDER)
              }
            >
              <MaterialIcons name="add" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Entypo
            name="chevron-right"
            size={30}
            color="white"
            style={styles.arrow}
          />
        )}
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={item.items}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <OrderedItem data={item} />}
      />
      <View style={styles.seprator} />
    </View>
  );
};

export default TableGridItem;
