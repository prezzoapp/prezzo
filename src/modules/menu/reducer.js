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
  CHANGE_IMAGE,
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
  ],
  data: null
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
      return state.update('isBusy', () => true);
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
      console.log("Action.payload");
      console.log(action.paylaod);
      return state.update('data', () => action.payload)
        .update('isBusy', () => false);
    case MENU_ADD_CATEGORY_SUCCESS:
      sectionID += 1;

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').push(
            initialCategoryObj.set('id', sectionID).set('title', ("Category ID: " + sectionID))
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
      // return state.set('menus', state.get('menus').update(
      //   0, (menu) => {
      //     return menu.set('categories', menu.get('categories').update(
      //       menu.get('categories').findIndex((category) => {
      //         return category.get('id') === action.payload.categoryId;
      //       }), (category) => {
      //         return category.set('edit', false);
      //       }
      //     ));
      //   }));

      return state;

    case MENU_DELETE_CATEGORY_SUCCESS:
      console.log(state.get('menus').first().get('categories').findIndex((category) => {
        return category.get('id') === action.payload.categoryId;
      }));

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
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload.categoryId;
      });

      sectionObj = state.get('menus').first().get('categories').get(sectionIndex);

      menuIndex = state.get('menus').first().get('categories')
        .get(sectionIndex).get('data').findIndex((item) => {
          return item.get('id') === action.payload.itemId;
        });

      generatedIDForNewElement = (sectionObj.get('data').get(menuIndex).get('itemImages').size === 0)
        ? 0
        : sectionObj.get('data').get(menuIndex).get('itemImages').last().get('id') + 1;

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (sectionItem) => {
              return sectionItem.set('data', sectionItem.get('data').update(
                menuIndex, (menuItem) => {
                  return menuItem.set('itemImages',
                    menuItem.get('itemImages').push(initialItemImageObj.set('id', generatedIDForNewElement)));
                }
              ));
            }
          ));
        }));

    case CHANGE_IMAGE:
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload.categoryId;
      });

      menuIndex = state.get('menus').first().get('categories')
        .get(sectionIndex).get('data').findIndex((item) => {
          return item.get('id') === action.payload.itemId;
        });

      imageIndex = state.get('menus').first().get('categories')
        .get(sectionIndex).get('data').get(menuIndex).get('itemImages').findIndex((item) => {
          return item.get('id') === action.payload.imageId;
        });

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (sectionItem) => {
              return sectionItem.set('data', sectionItem.get('data').update(
                menuIndex, (menuItem) => {
                  return menuItem.set('itemImages', menuItem.get('itemImages').update(
                    imageIndex, (imageItem) => {
                      return imageItem.set('image_path', action.payload.imageObjPath);
                    }));
                }));
            }));
        }));

    case MENU_DELETE_IMAGE_SUCCESS:
      sectionIndex = state.get('menus').first().get('categories').findIndex((item) => {
        return item.get('id') === action.payload.categoryId;
      });

      menuIndex = state.get('menus').first().get('categories')
        .get(sectionIndex).get('data').findIndex((item) => {
          return item.get('id') === action.payload.itemId;
        });

      return state.set('menus', state.get('menus').update(
        0, (menu) => {
          return menu.set('categories', menu.get('categories').update(
            sectionIndex, (sectionItem) => {
              return sectionItem.set('data', sectionItem.get('data').update(
                menuIndex, (menuItem) => {
                  return menuItem.set('itemImages', menuItem.get('itemImages').delete(
                      menuItem.get('itemImages').findIndex((imageItem) => {
                        return imageItem.get('id') === action.payload.imageId;
                      })
                  ));
                }
              ));
            }
          ));
        }));
      //return state.set('isBusy', true);
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
