// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ExploreListItem from '../../../components/ExploreListItem';
import styles from './styles';

export default class ExploreList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired
  };

  render() {
    const { restaurants } = this.props;

    if(restaurants.length === 0 && this.props.isBusy === false) {
      return (
        <View style={styles.notFoundHolder}>
          {this.props.isBusy ? null : (
            <Text style={styles.message}>
              Oops, No Restaurants found.
            </Text>
          )}
        </View>
      );
    } else if(this.props.isBusy === false) {
      return (
        <FlatList
          contentContainerStyle={{ marginHorizontal: 15, paddingTop: 10 }}
          style={{ marginTop: 140 }}
          initialNumToRender={10}
          keyExtractor={(item, index) => index.toString()}
          data={restaurants}
          renderItem={({ item }) => (
            <ExploreListItem item={item} navigate={this.props.navigate} />
          )}
        />
      );
    } else {
      return null;
    }
  }
}
