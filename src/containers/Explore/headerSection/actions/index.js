export const toggleFilter = (id) => {
  return {
    type: 'TOGGLE_FILTER',
    payload: id
  };
};

export const selectedFilterID = (id) => {
  return {
    type: 'SELECTED_FILTER_ID',
    payload: id
  };
};
