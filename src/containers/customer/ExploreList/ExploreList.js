import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import PropTypes from 'prop-types';

import ExploreListItem from '../../../components/ExploreListItem';

import styles from './styles';

export default class ExploreList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    exploreRestaurants: PropTypes.array.isRequired
  };

  render() {
    console.log(
      "Section List Rendering Occurred! Don't Know Why. It Shouldn't be Rendered."
    );

    const { exploreRestaurants } = this.props;

    return (
      <FlatList
        contentContainerStyle={{ marginHorizontal: 15, paddingTop: 10 }}
        style={{ marginTop: 132.5 }}
        initialNumToRender={10}
        keyExtractor={(item, index) => index}
        data={exploreRestaurants}
        renderItem={({ item }) => <ExploreListItem item={item} />}
      />
    );
  }
}
