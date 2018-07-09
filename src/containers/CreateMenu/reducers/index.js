
let menuID = 0;

let imageID = 0;

const initialState = {
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
}

export const menusListReducer = ( state = initialState, action ) =>
{
    switch( action.type )
    {
        case 'ADD_NEW_ITEM':
            menuID = menuID + 1;

            newMenuItemClone = { ...initialState.menuState[0] };

            newMenuItemClone.id = menuID;

            newState = {
                ...state,
                menuState: [ ...state.menuState, newMenuItemClone ]
            }

            return newState;
        break;

        case 'ADD_NEW_IMAGE_COMPONENT':

            // selectedObj = Object.assign({}, state.menuState[ state.menuState.findIndex( x => x.id === action.payload ) ]);

            // newImageEle = { ...initialState.menuState[0].itemImages[0] }

            // newImageEle.id = selectedObj.itemImages[ selectedObj.itemImages.length - 1 ].id + 1;

            // selectedObj.itemImages = [ ...selectedObj.itemImages, newImageEle ];

            // console.log(selectedObj.itemImages.length);

            return state;
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