import showGenericAlert from '../components/GenericAlert';
import { TIME_OUT } from './constants';

export const getTimeStampString = () => new Date().getTime().toString();

export const findById = (tree, testID) => {
  if (tree.props && tree.props.testID === testID) {
    return tree;
  }
  if (tree.children && tree.children.length > 0) {
    let childs = tree.children;
    for (let i = 0; i < childs.length; i++) {
      let item = findById(childs[i], testID);
      if (typeof item !== 'undefined') {
        return item;
      }
    }
  }
};

export const showAlert = (title, message, duration, callback, buttonsArray) => {
  let timer = -1;
  clearTimeout(timer);
  timer = setTimeout(() => {
    showGenericAlert(title, message, buttonsArray);
    callback && callback();
  }, duration);
};

export const showAlertWithMessage = (
  title = 'Uh-oh!',
  obj,
  callback = null,
  buttonsArray = null
) => {
<<<<<<< HEAD
  showAlert(title, obj.message, TIME_OUT, callback, buttonsArray);
=======
  if(obj.message === NETWORK_REQUEST_FAILED) {
    showAlert(title, INTERNET_NOT_CONNECTED, TIME_OUT, callback);
  } else {
    showAlert(title, obj.message, TIME_OUT, callback, buttonsArray);
  }
>>>>>>> - Resolve cancel button along with the search bar not hidden on selecting the cancel button.
};

export const manuallyLogout = (err, func) => {
  showAlertWithMessage('Uh-oh!', err, null, [{
      text: 'Login again',
      onPress: () => func()
    }
  ]);
};
