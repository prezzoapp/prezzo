// @flow
import { connect } from 'react-redux';
import RestaurantDetails from './RestaurantDetails';
import { mapStateToProps, mapDispatchToProps } from './store';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
