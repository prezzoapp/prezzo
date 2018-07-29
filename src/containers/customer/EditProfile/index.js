// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../../modules/user';
import {uploadImage} from '../../../modules/upload';
import EditProfile from './EditProfile';

const mapStateToProps = state => {
  const user = state.get('user');
  const account = user.get('account');
  const isBusy = user.get('isBusy') ||
    state.get('upload').get('isBusy') || false;

  return {
    address: account.get('address'),
    avatarURL: account.get('avatarURL'),
    city: account.get('city'),
    firstName: account.get('firstName'),
    isBusy,
    lastName: account.get('lastName'),
    phone: account.get('phone'),
    zip: account.get('zip')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
