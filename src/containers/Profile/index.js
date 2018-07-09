// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Profile from './Profile';

export default connect(
  state => ({
    avatarURL: state.get('user').get('account').get('avatarURL')
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Profile);
