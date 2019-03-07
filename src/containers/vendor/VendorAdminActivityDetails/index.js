// @flow
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';
import VendorAdminActivityDetails from './VendorAdminActivityDetails';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorAdminActivityDetails);
