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
  showAlert(title, obj.message, TIME_OUT, callback, buttonsArray);
};
