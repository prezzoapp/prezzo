// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Profile from './Profile';

export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Profile);
