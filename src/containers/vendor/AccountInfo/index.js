// @flow
import {connect} from 'react-redux';
import AccountInfo from './AccountInfo';
import {mapStateToProps, mapDispatchToProps} from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountInfo);
