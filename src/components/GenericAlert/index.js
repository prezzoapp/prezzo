import { Alert } from 'react-native';

const showGenericAlert = (title = null, message, buttonsArray = null) => {
  Alert.alert(title, message, buttonsArray, { cancelable: false });
};

export default showGenericAlert;
