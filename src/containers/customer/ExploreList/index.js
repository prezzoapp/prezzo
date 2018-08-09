// @flow
import { connect } from 'react-redux';
import ExploreList from './ExploreList';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreList);
