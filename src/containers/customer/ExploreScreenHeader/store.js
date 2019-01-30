// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

// export const mapStateToProps = state => {
//   const filters = state
//     .get('explore')
//     .get('filters')
//     .toJS();
//   const minDistance = state.get('explore').get('minDistance');
//   const maxDistance = state.get('explore').get('maxDistance');
//   const distance = state.get('explore').get('distance');
//   const pricing = state.get('explore').get('pricing');
//
//   return {
//     filters,
//     minDistance,
//     maxDistance,
//     distance,
//     pricing
//   };
// };

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  // toggleFilter: bindActionCreators(toggleFilter, dispatch),
  // updateDistance: bindActionCreators(updateDistance, dispatch),
  // updatePrice: bindActionCreators(updatePrice, dispatch),
  // listVendors: bindActionCreators(listVendors, dispatch)
});
