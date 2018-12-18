import React from 'react';
import { View } from 'react-native';
import { BlurView, LinearGradient } from 'expo';
import { BottomTabBar } from 'react-navigation-tabs';
import styles from './styles';

const VendorTabBar = props => {
  return (
    <View {...props} style={styles.tabBarHolder}>
      <BlurView style={styles.innerContainer} tint="default" intensity={97}>
        <LinearGradient
          style={styles.innerContainer}
          colors={['transparent', '#2B2C2C']}
        >
          <BottomTabBar
            {...props}
            style={{
              left: 0,
              right: 0,
              position: 'absolute',
              backgroundColor: 'transparent',
              borderTopColor: 'transparent',
              alignItems: 'center'
            }}
          />
        </LinearGradient>
      </BlurView>
    </View>
  );
};

export default VendorTabBar;
