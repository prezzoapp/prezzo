import { fromJS } from 'immutable';

var trendingListItems = [];

for (let i = 0; i < 20; i++) {
    trendingListItems.push(
        {
            id: i,
            imagePath: require('../../../../../assets/images/card_1.jpg'),
            likes: 0,
            restaurant: 'True Food',
            city: 'Santa Monica'
        })
}

const initialState = fromJS(
    {
        sections: [
            {
                title: 'trending',
                data: trendingListItems
            }]
    });

export const sectionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_LIKES':
            return state.set('trendingListItems', state.get('trendingListItems').update(
                state.get('trendingListItems').findIndex((item) => {
                    return item.get('id') === action.payload
                }), (item) => {
                    return item.set('likes', item.get('likes') + 1);
                }));
            break;
    }

    return state;
}

export const selectedListItemIDReducer = (state = -1, action) => {
    switch (action.type) {
        case 'SELECTED_INDEX':
            return action.payload
            break;
    }

    return state;
}