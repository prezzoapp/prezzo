// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { loginWithFacebook } from '../../../modules/auth';
import { findUser } from '../../../modules/user';
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updateAvatarURL,
  updateFacebookId,
  updateFacebookToken
} from '../../../modules/Signup';
import Tutorial from './Tutorial';

export default connect(
  null,
  dispatch => {
    return {
      findUser: bindActionCreators(findUser, dispatch),
      updateEmail: bindActionCreators(updateEmail, dispatch),
      updateFirstName: bindActionCreators(updateFirstName, dispatch),
      updateLastName: bindActionCreators(updateLastName, dispatch),
      updateAvatarURL: bindActionCreators(updateAvatarURL, dispatch),
      loginWithFacebook: bindActionCreators(loginWithFacebook, dispatch),
      updateFacebookId: bindActionCreators(updateFacebookId, dispatch),
      updateFacebookToken: bindActionCreators(updateFacebookToken, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Tutorial);
