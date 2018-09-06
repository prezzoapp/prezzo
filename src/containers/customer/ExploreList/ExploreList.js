// @flow
import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import ExploreListItem from "../../../components/ExploreListItem";

export default class ExploreList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired
  };

  render() {
    const { restaurants } = this.props;

    return (
      <FlatList
        contentContainerStyle={{ marginHorizontal: 15, paddingTop: 10 }}
        style={{ marginTop: 132.5 }}
        initialNumToRender={10}
        keyExtractor={(item, index) => index.toString()}
        data={restaurants}
        renderItem={({ item }) => (
          <ExploreListItem
            item={item}
            navigate={this.props.navigate}
          />
        )}
      />
    );
  }
}
