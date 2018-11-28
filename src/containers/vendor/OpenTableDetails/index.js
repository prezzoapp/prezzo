// @flow
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import OpenTableDetails from './OpenTableDetails';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTableDetails);
