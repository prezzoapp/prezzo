// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import styles from './styles';
import ExploreSearchInput from '../../../components/ExploreSearchInput';

const TableScreenHeader = props => (
  <View style={styles.header}>
    <LinearGradient
      colors={['rgb(0,0,0)', 'transparent']}
      style={styles.linearGradientStyle}
    >
      <ExploreSearchInput />
      <View style={styles.detailContainer}>
        <Image
          source={require('../../../../assets/images/item5.png')}
          style={styles.vendorImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.vendorName}>Dummy</Text>
          <Text style={styles.category}>Dummy</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
);

export default TableScreenHeader;
