// @flow
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import Activity from './Activity';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
