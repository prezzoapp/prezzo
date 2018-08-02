
import { connect } from 'react-redux';
import MapScreen from './MapScreen';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
