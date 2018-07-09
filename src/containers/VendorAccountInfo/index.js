// @flow
import {connect} from 'react-redux';
import VendorAccountInfo from './VendorAccountInfo';
import {mapStateToProps, mapDispatchToProps} from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorAccountInfo);
