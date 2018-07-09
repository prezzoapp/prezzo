// @flow
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

export const mapStateToProps = state => ({
  vendor: state.get('user').get('account').get('vendor')
});

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
