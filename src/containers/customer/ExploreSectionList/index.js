// @flow
import { connect } from 'react-redux';
import ExploreSectionList from './ExploreSectionList';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreSectionList);
