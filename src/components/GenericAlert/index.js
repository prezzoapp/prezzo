import { Alert } from 'react-native';

const showGenericAlert = (title = null, message, buttonsArray = null) => {
  Alert.alert(title, message, buttonsArray);
};

export default showGenericAlert;
