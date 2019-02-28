// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

export const mapStateToProps = state => {
  const isBusy = state.get('userActivity').get('isBusy');

  return {
    isBusy
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};
