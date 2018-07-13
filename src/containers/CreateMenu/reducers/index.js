import { Map, fromJS, toJS } from 'immutable';

let menuID = 0;

const initialState = fromJS({
    categoryName: 'Sample Category',

    menuState: [{
        id: menuID,
        name: 'Item',
        price: 'Price',
        description: 'Description',
        editable: false,
        itemImages: [
            {
                id: 0,
                image_path: ''
            }]
    }]
});

export const menusListReducer = (state = initialState, action) => {
    switch (action.type) {
        // MENU ITEM REDUCER(s)

        case 'ADD_NEW_ITEM':
            menuID = menuID + 1;

            let menuItemClone = initialState.get('menuState').get(0).set('id', menuID);

            let updatedMenuItemsArray = state.get('menuState').push(menuItemClone);

            let newState = state.set('menuState', updatedMenuItemsArray);

            return newState;
            break;

        case 'EDIT_ITEM':
            return state.set('menuState', state.get('menuState').update(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload
                }), (item) => {
                    return item.set('editable', true);
                }));
            break;

        case 'SAVE_ITEM':
            return state.set('menuState', state.get('menuState').update(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload
                }), (item) => {
                    return item.set('editable', false);
                }));
            break;

        case 'DELETE_ITEM':
            return state.set('menuState', state.get('menuState').delete(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload
                })));
            break;


        // MENU-ITEM IMAGE-COMPONENT REDUCER(s)

        case 'ADD_NEW_IMAGE_COMPONENT':
            let getParentObjID = action.payload;

            let objectID = state.get('menuState').findIndex((item) => {
                return item.get('id') === getParentObjID
            });

            let parentObj = state.get('menuState').get(objectID);

            let updatedIDforImageItemClone = (parentObj.get('itemImages').size === 0)
                ? 0
                : parentObj.get('itemImages').get(-1).get('id') + 1;

            let imageItemClone = initialState.get('menuState').get(0).get('itemImages').get(0).set('id', updatedIDforImageItemClone);

            let updatedParentItem = parentObj.set('itemImages', parentObj.get('itemImages').push(imageItemClone));

            let newMenuItemsArray = state.get('menuState').set(objectID, updatedParentItem);

            let updatedState = state.set('menuState', newMenuItemsArray);

            return updatedState;
            break;

        case 'CHANGE_IMAGE':
            return state.set('menuState', state.get('menuState').update(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload.parentID
                }), (item) => {
                    return item.set('itemImages', item.get('itemImages').update(
                        item.get('itemImages').findIndex((item) => {
                            return item.get('id') === action.payload.imageID
                        }), (item) => {
                            return item.set('image_path', action.payload.imagePath)
                        }
                    ));
                }));
            break;

        case 'DELETE_ITEM_IMAGE':
            return state.set('menuState', state.get('menuState').update(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload.parentID
                }), (item) => {
                    return item.set('itemImages', item.get('itemImages').delete(
                        item.get('itemImages').findIndex((item) => {
                            return item.get('id') === action.payload.imageID
                        })
                    ));
                }));
            break;

        case 'CHANGE_TEXT':
            return state.set('menuState', state.get('menuState').update(
                state.get('menuState').findIndex((item) => {
                    return item.get('id') === action.payload.parentID
                }), (item) => {
                    if (action.payload.inputType === 'ITEM_NAME')
                        return item.set('name', action.payload.text);
                    else if (action.payload.inputType === 'ITEM_PRICE')
                        return item.set('price', action.payload.text);
                    else
                        return item.set('description', action.payload.text);
                }));
            break;

        default:
            return state;
    }
}