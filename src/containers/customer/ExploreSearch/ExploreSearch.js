import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { BlurView } from 'react-native-blur';
import SearchVendorListItem from '../../../components/SearchVendorListItem';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import styles from './styles';

class ExploreSearch extends Component {
  constructor() {
    super();
    this.state = { showList: false };
  }

  showList(value) {
    this.setState(() => {
      return {
        showList: value
      }
    });
  }

  renderSeparator = () => <View style={styles.listSeparator} />;

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: this.state.showList ? 0 : null
        }}
      >
        {this.state.showList &&
          <View style={styles.container}>
            <BlurView style={styles.container} blurType="dark" blurAmount={6} />
            <View style={styles.listHolder}>
              <FlatList
                keyExtractor={item => item._id}
                data={this.props.restaurants}
                ItemSeparatorComponent={() => this.renderSeparator()}
                renderItem={({ item }) => <SearchVendorListItem item={item} />}
              />
            </View>
          </View>
        }
        <ExploreSearchInput showList={(value) => this.showList(value)} />
      </View>
    );
  }
}

export default ExploreSearch;
