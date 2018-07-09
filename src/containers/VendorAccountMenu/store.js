// @flow
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';

export const mapStateToProps = state => ({
  vendor: state.get('vendor').get('data')
});

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
