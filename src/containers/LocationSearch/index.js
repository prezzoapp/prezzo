// @flow
import {connect} from 'react-redux';
import LocationSearch from './LocationSearch';
import {mapStateToProps, mapDispatchToProps} from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSearch);
