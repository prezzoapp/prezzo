import { connect } from 'react-redux';
import ActivityOpenOrder from './ActivityOpenOrder';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityOpenOrder);
