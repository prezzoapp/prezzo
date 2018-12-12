// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { loginWithEmail } from '../../../modules/auth';
import { listCreditCards } from '../../../modules/paymentMethods';
import Login from './Login';

const mapStateToProps = state => ({
  isBusy: state.get('auth').get('isBusy'),
});

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      loginWithEmail: bindActionCreators(loginWithEmail, dispatch),
      listCreditCards: bindActionCreators(listCreditCards, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Login);
