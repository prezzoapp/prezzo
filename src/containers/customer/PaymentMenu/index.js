import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import PaymentMenu from './PaymentMenu';
import { listCreditCards } from '../../../modules/paymentMethods';


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMenu);
