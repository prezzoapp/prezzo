// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { addCreditCardInfo } from '../../../modules/paymentMethods';

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    addCreditCardInfo: bindActionCreators(addCreditCardInfo, dispatch)
  };
};
