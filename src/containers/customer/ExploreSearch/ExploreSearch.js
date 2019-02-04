// @flow
import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import SearchVendorListItem from '../../../components/SearchVendorListItem';
import styles from './styles';

const ExploreSearch = props => {
  renderSeparator = () => <View style={styles.listSeparator} />;

  return (
    <View style={styles.container}>
      <BlurView style={styles.blurView} tint="dark" intensity={95} />
      <View style={styles.listHolder}>
        {(() => {
          if(props.showLoader) {
            return (
              <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="white" />
              </View>
            );
          } else if(props.filteredData.length !== 0) {
            return (
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => null}
                  style={styles.closeByBtn}
                >
                  <Text style={styles.closeByBtnText}>Close By</Text>
                </TouchableOpacity>
                <FlatList
                  keyExtractor={item => item._id}
                  data={props.filteredData}
                  contentContainerStyle={styles.flatListStyle}
                  ItemSeparatorComponent={() => this.renderSeparator()}
                  renderItem={({ item }) => (
                    <SearchVendorListItem
                      item={item}
                      navigate={props.navigate}
                    />
                  )}
                />
              </View>
            );
          }
          return (
            <View style={styles.loaderView}>
              <Text style={styles.message}>No restaurant found.</Text>
            </View>
          );
        })()}
      </View>
    </View>
  );
}

ExploreSearch.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default ExploreSearch;
