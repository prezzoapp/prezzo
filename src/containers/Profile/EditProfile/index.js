// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../../modules/user';
import EditProfile from './EditProfile';

export default connect(
  state => ({
    avatarURL: state.get('user').get('account').get('avatarURL'),
    firstName: state.get('user').get('account').get('firstName'),
    lastName: state.get('user').get('account').get('lastName'),
    phone: state.get('user').get('account').get('phone'),
    address: state.get('user').get('account').get('address'),
    zip: state.get('user').get('account').get('zip'),
    city: state.get('user').get('account').get('city')
  }),
  dispatch => {
    return {
      updateUser: bindActionCreators(updateUser, dispatch)
    };
  }
)(EditProfile);
