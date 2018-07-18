// @flow
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import Maps from './Map';

const mapStateToProps = (state) => {
  return {
    restaurantsListReducer: state.get('restaurantsListReducer').toJS()
  };
};

export default connect(mapStateToProps,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(Maps);
