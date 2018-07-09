export const addNewItemInMenuList = () =>
{
    return {
        type: 'ADD_NEW_ITEM'
    }
}

export const addNewImageComponent = ( parentID ) =>
{
    return {
        type: 'ADD_NEW_IMAGE_COMPONENT',
        payload: parentID
    }
}

export const changeImage = ( parentID, imageID, imagePath ) =>
{
    return {
        type: 'CHANGE_IMAGE',
        payload: { parentID, imageID, imagePath }
    }
}

export const editItem = ( id ) =>
{
    return {
        type: 'EDIT_ITEM',
        payload: id
    }
}