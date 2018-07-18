import {fromJS} from 'immutable';

const filters = fromJS({
  filters: [{
    id: 0,
    filterType: 'realtime',
    name: 'Open Now',
    image: '../../../../../assets/images/filtes/realtime-protection.png'
  },{
    id: 1,
    filterType: 'dollar',
    name: 'Price',
    image: '../../../../../assets/images/filtes/dollar-sign-icon.png'
  },{
    id: 2,
    filterType: 'wifi',
    name: 'Wifi',
    image: '../../../../../assets/images/filtes/wifi-icon.png'
  },{
    id: 3,
    filterType: 'delivery',
    name: 'Delivery',
    image: '../../../../../assets/images/filtes/delivery.png'
  },{
    id: 4,
    filterType: 'breakfast',
    name: 'Breakfast',
    image: '../../../../../assets/images/filtes/breakfast.png'
  }]
})

export const filtersReducer = (state = filters, action) =>
{
  return state;
}