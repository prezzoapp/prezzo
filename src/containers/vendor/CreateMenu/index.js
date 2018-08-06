// @flow
import { connect } from 'react-redux';
import CreateMenu from './CreateMenu';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMenu);
