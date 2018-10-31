import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import PaymentMenu from './PaymentMenu';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMenu);
