// @flow
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
// import { NavigationActions } from 'react-navigation';
import Tables from './Tables';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables);
