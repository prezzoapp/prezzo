// @flow
import { connect } from 'react-redux';
import VendorSearch from './VendorSearch';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorSearch);
