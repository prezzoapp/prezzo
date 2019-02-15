import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import styles from './styles';

const LoadingComponent = props => {
  return (
    <Modal
      transparent
      animationType="none"
      visible={props.visible}
      onRequestClose={() => null}
    >
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};

export default LoadingComponent;
