// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import Profile from './Profile';
import { userLogout } from '../../../modules/auth';
import { updateUser } from '../../../modules/user';
import { uploadImage } from '../../../modules/upload';

const mapStateToProps = state => {
  const user = state.get('user');
  const account = user.get('account');
  const isBusy =
    user.get('isBusy') ||
    state.get('upload').get('isBusy') ||
    state.get('auth').get('isBusy') ||
    false;

  return {
    address: account.get('address'),
    avatarURL: account.get('avatarURL'),
    city: account.get('city'),
    firstName: account.get('firstName'),
    isBusy,
    lastName: account.get('lastName'),
    phone: account.get('phone'),
    zip: account.get('zip'),
    isBusy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
