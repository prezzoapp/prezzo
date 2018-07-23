// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import HeaderSection from './headerSection';

import {toggleFilter, selectedFilterID} from './actions';

const mapStateToProps = (state) => {
  return {
    filtersReducer: state.get('filtersReducer'),
    // selectedFilterID: state.get('selectedFilterIDReducer')
  };
};

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      toggleFilter: bindActionCreators(toggleFilter, dispatch),
      // selectedFilterID: bindActionCreators(selectedFilterID, dispatch)
    };
  }
)(HeaderSection);
