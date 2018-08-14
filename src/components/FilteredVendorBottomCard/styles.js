import { StyleSheet } from "react-native";

import { FONT_FAMILY } from "../../services/constants";

const styles = StyleSheet.create({
  filteredRestaurantsBottomCardHolder: {
    backgroundColor: "rgb(51,51,51)",
    flex: 0.4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  },

  listItemBtn: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  titleHolder: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  statusImage: {
    height: 18,
    width: 18,
    resizeMode: "contain"
  },

  name: {
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    color: "white",
    flex: 1,
    paddingRight: 5
  },

  distance: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    color: "white"
  },

  status: {
    color: "rgb(46,214,116)",
    fontFamily: FONT_FAMILY,
    paddingLeft: 15,
    position: "relative",
    top: -4
  },

  statusHolder: {
    flexDirection: "row",
    paddingTop: 10
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(59,97,74)"
  }
});

export default styles;
