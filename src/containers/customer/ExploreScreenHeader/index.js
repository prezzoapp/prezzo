// @flow
import { connect } from 'react-redux';
import ExploreScreenHeader from './ExploreScreenHeader';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreScreenHeader);
