import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="white"/>
  </View>
);

export default Loader;
