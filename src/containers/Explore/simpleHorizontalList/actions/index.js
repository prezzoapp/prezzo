export const selectedListItemIDAction = (id) => {
    return {
        type: 'SELECTED_INDEX',
        payload: id
    }
}

export const updateLikesAction = (id) => {
    return {
        type: 'UPDATE_LIKES',
        payload: id
    }
}