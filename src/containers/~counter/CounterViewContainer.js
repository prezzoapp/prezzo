import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import CounterView from './CounterView';
import * as CounterStateActions from '../counter/CounterState';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      counterStateActions: bindActionCreators(CounterStateActions, dispatch)
    };
  }
)(CounterView);
