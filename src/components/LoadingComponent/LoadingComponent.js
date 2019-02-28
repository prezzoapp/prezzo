import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import DeveloperMenu from '../DeveloperMenu';
import styles from './styles';

const LoadingComponent = props => {
  return (
    <Modal
      transparent
      animationType="none"
      visible={props.visible}
      onRequestClose={() => null}
    >
      <View style={styles.container}>
        <View style={styles.loadingView}>
          <ActivityIndicator size="small" color="grey" />
          <Text numberOfLines={1} style={styles.waitText}>
            Please wait...
          </Text>
        </View>
      </View>
      {__DEV__ && <DeveloperMenu />}
    </Modal>
  );
};

export default LoadingComponent;
