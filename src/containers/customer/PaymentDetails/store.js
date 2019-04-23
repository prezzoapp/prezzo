// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addCreditCardInfo,
  listCreditCards,
  getToken,
  isTokenizationComplete,
  showLoading,
  hideLoading
} from '../../../modules/paymentMethods';
import { userLogout } from '../../../modules/auth';

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    addCreditCardInfo: bindActionCreators(addCreditCardInfo, dispatch),
    listCreditCards: bindActionCreators(listCreditCards, dispatch),
    getToken: bindActionCreators(getToken, dispatch),
    isTokenizationComplete: bindActionCreators(isTokenizationComplete, dispatch),
    showLoading: bindActionCreators(showLoading, dispatch),
    hideLoading: bindActionCreators(hideLoading, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};
