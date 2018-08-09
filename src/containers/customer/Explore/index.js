// @flow
import { connect } from 'react-redux';
import Explore from './Explore';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
