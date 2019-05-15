import MyHistory from './MyHistory';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHistory);
