import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import PaymentDetails from './PaymentDetails';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetails);
