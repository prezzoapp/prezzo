import { connect } from 'react-redux';
import Checkout from './Checkout';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Checkout);
