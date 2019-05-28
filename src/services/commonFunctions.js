export const getTimeStampString = () => new Date().getTime().toString();

export const findById = (tree, testID) => {
  if (tree.props && tree.props.testID === testID) {
    return tree;
  }
  if (tree.children && tree.children.length > 0) {
    let childs = tree.children;
    for (let i = 0; i < childs.length; i++) {
      let item = findById(childs[i], testID);
      if (typeof item !== 'undefined') {
        return item;
      }
    }
  }
};

export const convertToTitleCase = str => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
