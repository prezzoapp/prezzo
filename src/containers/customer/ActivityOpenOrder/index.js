import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import ActivityOpenOrder from './ActivityOpenOrder';
import { mapStateToProps, mapDispatchToProps } from './store';

export default withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
  )(ActivityOpenOrder)
);
