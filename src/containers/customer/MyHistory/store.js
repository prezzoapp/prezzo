// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listCompletedOrders } from '../../../modules/userHistory';

export const mapStateToProps = state => {
  const data = state.get('userHistory').get('data');
  const isBusy = state.get('userHistory').get('isBusy');
  const userId = state
    .get('user')
    .get('account')
    .get('_id');

  return {
    data,
    isBusy,
    userId
  }
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listCompletedOrders: bindActionCreators(listCompletedOrders, dispatch)
});
