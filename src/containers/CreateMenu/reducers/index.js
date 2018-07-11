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
            image_path: require("../../../../assets/images/default_image_placeholder.png")
        }]
    }]  
});

export const menusListReducer = ( state = initialState, action ) =>
{
    switch( action.type )
    {
        case 'ADD_NEW_ITEM':
            menuID = menuID + 1;

            let menuItemClone = initialState.get('menuState').get(0).set('id', menuID);

            let updatedMenuItemsArray = state.get('menuState').push(menuItemClone);

            let newState = state.set('menuState', updatedMenuItemsArray );

            return newState;
        break;

        case 'ADD_NEW_IMAGE_COMPONENT':
            let getParentObjID = action.payload;

            let objectID = state.get('menuState').findIndex(( item ) =>
            {
                return item.get( 'id' ) === getParentObjID
            });

            let parentObj = state.get('menuState').get(objectID);

            let updatedIDforImageItemClone = parentObj.get('itemImages').get(-1).get('id') + 1;

            let imageItemClone = initialState.get('menuState').get(0).get('itemImages').get(0).set('id', updatedIDforImageItemClone);

            let updatedParentItem = parentObj.set('itemImages', parentObj.get('itemImages').push(imageItemClone));

            let newMenuItemsArray = state.get('menuState').set(objectID, updatedParentItem );

            let updatedState = state.set('menuState', newMenuItemsArray );
            
            return updatedState;
        break;

        case 'CHANGE_IMAGE':
            console.log(action.payload);
        break;

        case 'EDIT_ITEM':
            newState = [ ...state ];
            newState[ newState.findIndex( x => x.id !== action.payload ) ].editable = false;
            newState[ newState.findIndex( x => x.id === action.payload ) ].editable = true;
            return newState;
        break;

        case 'CHANGE_ITEM':
            newState = [...state];

            if( action.payload.type === 'ITEM_NAME' )
                newState[state.findIndex( x => x.id === action.payload.id )].text = action.payload.text;

            return newState;
        break;

        default:
            return state;
    }
}