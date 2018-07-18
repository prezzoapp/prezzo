// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import HeaderSection from './headerSection';

const mapStateToProps = (state) => {
  return {
    filtersReducer: state.get('filtersReducer').get('filters').toJS()
  };
};

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(HeaderSection);
