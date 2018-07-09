// @flow
import {connect} from 'react-redux';
import VendorAccountMenu from './VendorAccountMenu';
import {mapStateToProps, mapDispatchToProps} from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorAccountMenu);
