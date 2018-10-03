// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import styles from './styles';
import ExploreSearchInput from '../../../components/ExploreSearchInput';

const TableScreenHeader = props => {
  
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={['rgb(0,0,0)', 'transparent']}
        style={styles.linearGradientStyle}
      >
        <ExploreSearchInput
          showList={() => null}
          showListValue={() => null}
          clearTimer={() => null}
          onTextChange={() => null}
        />
        <View style={styles.detailContainer}>
          <Image
            source={require('../../../../assets/images/item5.png')}
            style={styles.vendorImage}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.vendorName}>
              {props.vendorData.get('name')}
            </Text>
            <Text style={styles.category}>
              {props.tableSection === 0
                ? 'Open Tables'
                : props.tableSection === 1
                  ? 'Queue Tables'
                  : 'Closed Tables'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TableScreenHeader;
