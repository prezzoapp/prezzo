// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../../modules/auth';
import EditProfile from './EditProfile';

export default connect(
  null,
  dispatch => {
    return {
      loginWithEmail: bindActionCreators(updateUser, dispatch)
    };
  }
)(EditProfile);
