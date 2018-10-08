// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import Profile from './Profile';
import { userLogout } from '../../../modules/auth';

const mapStateToProps = state => {
  return {
    avatarURL: null,
    vendor: null,
    logoutIsBusy: null
  };
  // const account = state.get('user').get('account');
  // const logoutIsBusy = state.get('auth').get('isBusy');
  //
  // return {
  //   avatarURL: account.get('avatarURL'),
  //   vendor: account.get('vendor') || null,
  //   logoutIsBusy
  // };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
