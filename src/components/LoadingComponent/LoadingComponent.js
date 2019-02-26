import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import styles from './styles';

const LoadingComponent = props => {
  return (
    <Modal
      transparent
      animationType="none"
      onRequestClose={() => null}
      visible={props.visible}
    >
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};

export default LoadingComponent;
