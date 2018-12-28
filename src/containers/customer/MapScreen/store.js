// @flow
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { listVendors, disableVendorListItem } from '../../../modules/explore';

export const mapStateToProps = state => {
  const data = state
    .get('explore')
    .get('restaurants')
    .toJS();

    const filters = state
      .get('explore')
      .get('filters')
      .toJS();
    const distance = state.get('explore').get('distance');
    const pricing = state.get('explore').get('pricing');

  return {
    data,
    filters,
    distance,
    pricing
  };
};

export const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  listVendors: bindActionCreators(listVendors, dispatch),
  disableVendorListItem: bindActionCreators(disableVendorListItem, dispatch)
});
