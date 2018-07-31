import { fromJS } from 'immutable';

let trendingListItems = [];

for (let i = 0; i < 20; i++) {
  trendingListItems.push({
    id: i,
    imagePath: require('../../../assets/images/card_1.jpg'),
    likes: 0,
    restaurant: 'True Food',
    city: 'Santa Monica'
  })
}

const initialState = fromJS({
  sections: [{
      title: 'trending',
      data: [trendingListItems]
    },
    {
      title: 'featured',
      data: [trendingListItems]
    },
    {
      title: 'near me',
      data: [trendingListItems]
    }
  ]
});

const exploreSectionList = (state = initialState, action) => {
  return state;
};

export default exploreSectionList;
