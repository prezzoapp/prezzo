import {fromJS} from 'immutable';

// let menuID = 0;

let sectionID = 0;

const initialItemImageObj = fromJS({
  id: 0,
  image_path: ''
});

const initialState = fromJS({
  categories: [{
    id: sectionID,

    createdDate: new Date(),

    title: 'Sample Category',

    data: [{
      id: 0,
      createdDate: new Date(),
      name: 'Item',
      price: 'Price',
      description: 'Description',
      editable: false,
      itemImages: []
    }]
  }]
});

export const menusListReducer = (state = initialState, action) => {
  var sectionIndex, sectionObj, menuIndex, menuObj, generatedIDForNewElement;

  switch (action.type) {
    case 'ADD_NEW_CATEGORY':
      sectionID += 1;

      return state.set('categories', state.get('categories').push(
          initialState.get('categories').get(0).set('id', sectionID))
      );

    // MENU ITEM REDUCER(s)

    case 'ADD_NEW_ITEM':
      sectionIndex = state.get('categories').findIndex((item) => {
        return item.get('id') === action.payload
      });

      sectionObj = state.get('categories').get(sectionIndex);

      generatedIDForNewElement = (sectionObj.get('data').size === 0) ? 0 : sectionObj.get('data').last().get('id') + 1;

      return state.set('categories', state.get('categories').update(
          sectionIndex, (item) => {
            return item.set('data', item.get('data').push(
              initialState.get('categories').get(0).get('data').get(0).set('id', generatedIDForNewElement)
            ));
          }));

    case 'EDIT_ITEM':
      sectionIndex = state.get('categories').findIndex((item) => {
        return item.get('id') === action.payload.sectionID
      });

      return state.set('categories', state.get('categories').update(
          sectionIndex, (sectionItem) => {
            return sectionItem.set('data', sectionItem.get('data').update(
              sectionItem.get('data').findIndex((menuItem) => {
                return menuItem.get('id') === action.payload.itemID
              }), (item) => {
              return item.set('editable', true)
            }
            ));
          }));

    case 'SAVE_ITEM':
      return state.set('menuState', state.get('menuState').update(
          state.get('menuState').findIndex((item) => {
            return item.get('id') === action.payload
          }), (item) => {
        return item.set('editable', false);
      }));

    case 'DELETE_ITEM':
      sectionIndex = state.get('categories').findIndex((item) => {
        return item.get('id') === action.payload.sectionID
      });

      return state.set('categories', state.get('categories').update(
          sectionIndex, (sectionItem) => {
            return sectionItem.set('data', sectionItem.get('data').delete(
              sectionItem.get('data').findIndex((menuItem) => {
                return menuItem.get('id') === action.payload.itemID
              })
            ));
          }));

    // MENU-ITEM IMAGE-COMPONENT REDUCER(s)

    case 'ADD_NEW_IMAGE_COMPONENT':
      sectionIndex = state.get('categories').findIndex((item) => {
        return item.get('id') === action.payload.sectionID
      });

      sectionObj = state.get('categories').get(sectionIndex);

      menuIndex = state.get('categories').get(sectionIndex).get('data').findIndex((item) => {
        return item.get('id') === action.payload.itemID
      });

      menuObj = state.get('categories').get(sectionIndex).get('data').get(menuIndex);

      generatedIDForNewElement = (sectionObj.get('data').get(menuIndex).get('itemImages').size === 0)
        ? 0
        : sectionObj.get('data').get(menuIndex).get('itemImages').last().get('id') + 1;

      return state.set('categories', state.get('categories').update(
        sectionIndex, (sectionItem) => {
          return sectionItem.set('data', sectionItem.get('data').update(
            menuIndex, (menuItem) => {
              return menuItem.set('itemImages',
                menuItem.get('itemImages').push(initialItemImageObj.set('id', generatedIDForNewElement)));
            }
          ));
        }
      ));

      //console.log(sectionObj.get('data').get(menuIndex).get('itemImages').last());

      //return state;

      //return state;

      // let parentObj = state.get('menuState').get(objectID);
      //
      // let updatedIDforImageItemClone = (parentObj.get('itemImages').size === 0)
      //     ? 0
      //     : parentObj.get('itemImages').get(-1).get('id') + 1;
      //
      // let imageItemClone = initialState.get('menuState').
      //   get(0).get('itemImages').get(0).set('id', updatedIDforImageItemClone);
      //
      // let updatedParentItem = parentObj.set('itemImages', parentObj.get('itemImages').push(imageItemClone));
      //
      // let newMenuItemsArray = state.get('menuState').set(objectID, updatedParentItem);
      //
      // let updatedState = state.set('menuState', newMenuItemsArray);

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

    case 'CHANGE_TEXT':
      return state.set('menuState', state.get('menuState').update(
          state.get('menuState').findIndex((item) => {
            return item.get('id') === action.payload.parentID
          }), (item) => {
        if (action.payload.inputType === 'ITEM_NAME') {
          return item.set('name', action.payload.text);
        }
        else if (action.payload.inputType === 'ITEM_PRICE') {
          return item.set('price', action.payload.text);
        }
        else {
          return item.set('description', action.payload.text);
        }
      }));

    default:
      return state;
  }
};
