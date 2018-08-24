import { Alert } from 'react-native';

const showGenericAlert = (title = null, message) => {
  Alert.alert(title, message);
};

export default showGenericAlert;
