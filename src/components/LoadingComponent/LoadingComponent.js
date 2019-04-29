import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import DeveloperMenu from '../DeveloperMenu';
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
        {__DEV__ && <DeveloperMenu />}
      </View>
    </Modal>
  );
};

export default LoadingComponent;
