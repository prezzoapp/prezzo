// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../../modules/auth';
import EditProfile from './EditProfile';

export default connect(
  state => ({
    avatarURL: state.get('auth').get('user').get('avatarURL'),
    firstName: state.get('auth').get('user').get('firstName'),
    lastName: state.get('auth').get('user').get('lastName'),
    phone: state.get('auth').get('user').get('phone'),
    address: state.get('auth').get('user').get('address'),
    zip: state.get('auth').get('user').get('zip'),
    city: state.get('auth').get('user').get('city')
  }),
  dispatch => {
    return {
      updateUser: bindActionCreators(updateUser, dispatch)
    };
  }
)(EditProfile);
