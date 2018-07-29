// @flow
import {fromJS} from 'immutable';
import {
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAILURE,
  MENU_ADD_CATEGORY_REQUEST,
  MENU_ADD_CATEGORY_SUCCESS,
  MENU_ADD_CATEGORY_FAILURE,
  EDIT_CATEGORY,
  MENU_UPDATE_CATEGORY_REQUEST,
  MENU_UPDATE_CATEGORY_SUCCESS,
  MENU_UPDATE_CATEGORY_FAILURE,
  MENU_DELETE_CATEGORY_REQUEST,
  MENU_DELETE_CATEGORY_SUCCESS,
  MENU_DELETE_CATEGORY_FAILURE,
  MENU_ADD_ITEM_REQUEST,
  MENU_ADD_ITEM_SUCCESS,
  MENU_ADD_ITEM_FAILURE,
  EDIT_ITEM,
  MENU_UPDATE_ITEM_REQUEST,
  MENU_UPDATE_ITEM_SUCCESS,
  MENU_UPDATE_ITEM_FAILURE,
  MENU_DELETE_ITEM_REQUEST,
  MENU_DELETE_ITEM_SUCCESS,
  MENU_DELETE_ITEM_FAILURE,
  MENU_ADD_IMAGE_REQUEST,
  MENU_ADD_IMAGE_SUCCESS,
  MENU_ADD_IMAGE_FAILURE,
  MENU_DELETE_IMAGE_REQUEST,
  MENU_DELETE_IMAGE_SUCCESS,
  MENU_DELETE_IMAGE_FAILURE
} from './types';

let sectionID = 0;

const INITIAL_STATE = fromJS({
  isBusy: false,
  menus: [
    {
      id: 0,
      createdDate: Date.now(),
      vendor: {
        id: 0,
        ref: null
      },
      categories: []
    }
  ]
  // data: []
});

const initialCategoryObj = fromJS({
  id: sectionID,
  createdDate: Date.now(),
  title: 'Sample Category',
  edit: false,
  data: []
});

const initialMenuItemObj = fromJS({
  id: 0,
  createdDate: Date.now(),
  name: 'Item',
  price: 'Price',
  description: 'Description',
  editable: false,
  itemImages: []
});

const initialItemImageObj = fromJS({
  id: 0,
  image_path: ''
});

export default (state = INITIAL_STATE, action) => {
  let sectionIndex;
  let sectionObj;
  let menuIndex;
  let generatedIDForNewElement;
  let imageIndex;

  switch (action.type) {
    case MENU_CREATE_REQUEST:
    case MENU_ADD_CATEGORY_REQUEST:
    case MENU_UPDATE_CATEGORY_REQUEST:
    case MENU_DELETE_CATEGORY_REQUEST:
    case MENU_ADD_ITEM_REQUEST:
    case MENU_UPDATE_ITEM_REQUEST:
    case MENU_DELETE_ITEM_REQUEST:
    case MENU_ADD_IMAGE_REQUEST:
    case MENU_DELETE_IMAGE_REQUEST:
      return state.set('isBusy', true);
    case MENU_CREATE_SUCCESS:
    case MENU_ADD_CATEGORY_SUCCESS:
      sectionID += 1;

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').push(
            initialCategoryObj.set('id', sectionID)
          ));
        }));

    case EDIT_CATEGORY:
      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            menu.get('categories').findIndex((category) => {
              return category.get('id') === action.payload.categoryId;
            }), (category) => {
              return category.set('edit', true);
            }
          ));
        }));

    case MENU_UPDATE_CATEGORY_SUCCESS:
      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            menu.get('categories').findIndex((category) => {
              return category.get('id') === action.payload.categoryId;
            }), (category) => {
              return category.set('edit', false);
            }
          ));
        }));

    case MENU_DELETE_CATEGORY_SUCCESS:
      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').delete(
            menu.get('categories').findIndex((category) => {
              return category.get('id') === action.payload.categoryId;
            })
          ));
        }));

    case MENU_ADD_ITEM_SUCCESS:
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload;
      });

      sectionObj = state.get('menus').first().get('categories').get(sectionIndex);

      generatedIDForNewElement = (
        sectionObj.get('data').size === 0)
        ? 0
        : sectionObj.get('data').last().get('id') + 1;

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (section) => {
              return section.set('data', section.get('data').push(
                initialMenuItemObj.set('id', generatedIDForNewElement)
              ));
            }
          ));
        }));

        case EDIT_ITEM:
          sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
            return item.get('id') === action.payload.categoryId;
          });

          return state.set('menus', state.get('menus').update(
            0, (menu) => {
              return menu.set('categories', menu.get('categories').update(
                sectionIndex, (sectionItem) => {
                  return sectionItem.set('data', sectionItem.get('data').update(
                    sectionItem.get('data').findIndex((menuItem) => {
                      return menuItem.get('id') === action.payload.itemId;
                    }), (item) => {
                    return item.set('editable', true);
                  }
                  ));
                }));
            }));

    case MENU_UPDATE_ITEM_SUCCESS:
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload.categoryId;
      });

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (sectionItem) => {
              return sectionItem.set('data', sectionItem.get('data').update(
                sectionItem.get('data').findIndex((menuItem) => {
                  return menuItem.get('id') === action.payload.itemId;
                }), (item) => {
                return item.set('editable', false);
              }
              ));
            }));
        }));

    case MENU_DELETE_ITEM_SUCCESS:
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload.categoryId;
      });

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (sectionItem) => {
              return sectionItem.set('data', sectionItem.get('data').delete(
                sectionItem.get('data').findIndex((menuItem) => {
                  return menuItem.get('id') === action.payload.itemId;
                })
              ));
            }));
        }));

    case MENU_ADD_IMAGE_SUCCESS:
    case MENU_DELETE_IMAGE_SUCCESS:
      return state.set('isBusy', true);
    case MENU_CREATE_FAILURE:
    case MENU_ADD_CATEGORY_FAILURE:
    case MENU_UPDATE_CATEGORY_FAILURE:
    case MENU_DELETE_CATEGORY_FAILURE:
    case MENU_ADD_ITEM_FAILURE:
    case MENU_UPDATE_ITEM_FAILURE:
    case MENU_DELETE_ITEM_FAILURE:
    case MENU_ADD_IMAGE_FAILURE:
    case MENU_DELETE_IMAGE_FAILURE:
      return state.set('isBusy', false);
    default:
      return state;
  }
};
