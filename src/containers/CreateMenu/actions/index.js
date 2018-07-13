
// MENU-ITEM ACTIONS

export const addNewItemInMenuList = () => {
    return {
        type: 'ADD_NEW_ITEM'
    }
}

export const editItem = (parentID) => {
    return {
        type: 'EDIT_ITEM',
        payload: parentID
    }
}

export const saveItem = (parentID) => {
    return {
        type: 'SAVE_ITEM',
        payload: parentID
    }
}

export const deleteItem = (itemID) => {
    return {
        type: 'DELETE_ITEM',
        payload: itemID
    }
}


// ITEM-IMAGE ACTIONS( FOR EACH MENU ITEM )

export const addNewImageComponent = (parentID) => {
    return {
        type: 'ADD_NEW_IMAGE_COMPONENT',
        payload: parentID
    }
}

export const changeImage = (parentID, imageID, imagePath) => {
    return {
        type: 'CHANGE_IMAGE',
        payload: { parentID, imageID, imagePath }
    }
}

export const deleteItemImage = (parentID, imageID) => {
    return {
        type: 'DELETE_ITEM_IMAGE',
        payload: { parentID, imageID }
    }
}


// EDIT TEXT INPUTS FOR MENU-ITEM

export const changeText = (parentID, inputType, text) => {
    return {
        type: 'CHANGE_TEXT',
        payload: { parentID, inputType, text }
    }
}