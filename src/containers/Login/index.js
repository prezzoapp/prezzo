// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {loginWithEmail} from '../../modules/auth';
import Login from './Login';

export default connect(
  null,
  dispatch => {
    return {
      loginWithEmail: bindActionCreators(loginWithEmail, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Login);
