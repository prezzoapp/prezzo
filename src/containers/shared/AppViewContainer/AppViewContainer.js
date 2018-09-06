import {connect} from 'react-redux';
import AppView from './AppView';

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    isFontsLoaded: state.getIn(['session','isFontsLoaded'])
  })
)(AppView);
