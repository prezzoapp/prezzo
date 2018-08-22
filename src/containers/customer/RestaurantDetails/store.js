// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export const mapStateToProps = state => {
  const data = state.get('restaurant').toJS();

  return {
    data
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch)
});
