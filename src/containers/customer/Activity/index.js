// @flow
import { connect } from 'react-redux';
import Activity from './Activity';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
