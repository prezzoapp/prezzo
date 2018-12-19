// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import styles from './styles';

const TableScreenHeader = props => {
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={['rgb(0,0,0)', 'transparent']}
        style={styles.linearGradientStyle}
      >
        <View style={styles.detailContainer}>
          <Image
            source={require('../../../../assets/images/item5.png')}
            style={styles.vendorImage}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.vendorName} numberOfLines={1}>
              {props.vendorData.get('name')}
            </Text>
            <Text style={styles.category} numberOfLines={1}>
              {(() => {
                if(props.tableSection === 0) {
                  if (props.tabName === 'tables') return 'Open Tables';
                  else if (props.tabName === 'delivery') return 'Delivery';
                  return 'Content Review';
                } else if(props.tableSection === 1) {
                  if (props.tabName === 'tables') return 'Queue Tables';
                  else if (props.tabName === 'delivery') return 'Delivery';
                  return 'Content Review';
                }
                return props.tabName === 'tables'
                  ? 'Closed Tables'
                  : 'Delivery';
              })()}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>

  );
};

export default TableScreenHeader;
