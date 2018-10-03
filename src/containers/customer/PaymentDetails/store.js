// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
  addCreditCardInfo,
  listCreditCards
} from '../../../modules/paymentMethods';

export const mapStateToProps = state => {
  const data = state
    .get('paymentMethods')
    .get('data')
    .toJS();

  return {
    data
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    addCreditCardInfo: bindActionCreators(addCreditCardInfo, dispatch),
    listCreditCards: bindActionCreators(listCreditCards, dispatch)
  };
};
