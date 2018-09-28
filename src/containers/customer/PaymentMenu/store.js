// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { removeCreditCard } from '../../../modules/paymentMethods';

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
    removeCreditCard: bindActionCreators(removeCreditCard, dispatch)
  };
};
