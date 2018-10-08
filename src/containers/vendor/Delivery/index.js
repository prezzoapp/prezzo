// @flow
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import Delivery from './Delivery';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
