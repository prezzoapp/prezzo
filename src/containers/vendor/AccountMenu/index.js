// @flow
import {connect} from 'react-redux';
import AccountMenu from './AccountMenu';
import {mapStateToProps, mapDispatchToProps} from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenu);
