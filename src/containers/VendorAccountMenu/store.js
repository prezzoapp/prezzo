// @flow
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
