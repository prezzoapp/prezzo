// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

const mapDispatchToProps = dispatch => {
  return {
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  };
};

export default mapDispatchToProps;
