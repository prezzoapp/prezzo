// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Profile from './Profile';

const mapStateToProps = state => {
  const account = state.get('user').get('account');

  return {
    avatarURL: account.get('avatarURL'),
    vendor: account.get('vendor') || null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
