export const addNewCategory = () => {
  return {
    type: 'ADD_NEW_CATEGORY'
  }
}

// MENU-ITEM ACTIONS

export const addNewItemInMenuList = (sectionID) => {
  return {
    type: 'ADD_NEW_ITEM',
    payload: sectionID
  }
}

export const editItem = (sectionID, itemID) => {
  return {
    type: 'EDIT_ITEM',
    payload: {sectionID, itemID}
  }
}

export const saveItem = (parentID) => {
  return {
    type: 'SAVE_ITEM',
    payload: parentID
  }
}

export const deleteItem = (sectionID, itemID) => {
  return {
    type: 'DELETE_ITEM',
    payload: {sectionID, itemID}
  }
}


// ITEM-IMAGE ACTIONS( FOR EACH MENU ITEM )

export const addNewImageComponent = (sectionID, itemID) => {
  return {
    type: 'ADD_NEW_IMAGE_COMPONENT',
    payload: {sectionID, itemID}
  }
}

export const changeImage = (parentID, imageID, imagePath) => {
  return {
    type: 'CHANGE_IMAGE',
    payload: {parentID, imageID, imagePath}
  }
}

export const deleteItemImage = (parentID, imageID) => {
  return {
    type: 'DELETE_ITEM_IMAGE',
    payload: {parentID, imageID}
  }
}


// EDIT TEXT INPUTS FOR MENU-ITEM

export const changeText = (parentID, inputType, text) => {
  return {
    type: 'CHANGE_TEXT',
    payload: {parentID, inputType, text}
  }
}
