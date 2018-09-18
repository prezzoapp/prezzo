// @flow
import { connect } from 'react-redux';
import Activity from './Activity';
import { mapDispatchToProps } from './store';

export default connect(
  null,
  mapDispatchToProps
)(Activity);
