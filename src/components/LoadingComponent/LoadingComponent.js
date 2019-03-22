import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
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

LoadingComponent.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default LoadingComponent;
