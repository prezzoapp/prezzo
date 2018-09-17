// @flow
import { connect } from 'react-redux';
import ExploreSearch from './ExploreSearch';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreSearch);
