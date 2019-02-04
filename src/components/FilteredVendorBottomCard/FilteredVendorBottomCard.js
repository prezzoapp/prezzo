import React, { Component } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import Button from '../Button';
import FilteredVendorBottomCardItem from './FilteredVendorBottomCardItem';

import styles from './styles';

import { SF_PRO_TEXT_SEMI_BOLD } from '../../services/constants';

class FilteredVendorBottomCard extends Component {
  constructor() {
    super();

    this.state = { showVendorInfo: false, item: {} };

    this.callMethod = this.callMethod.bind(this);
  }

  callMethod(item) {
    if (!this.state.showVendorInfo) {
      this.setState(() => {
        return {
          item,
          showVendorInfo: true
        }
      });
    }
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.filteredRestaurantsBottomCardHolder}>
        {!this.state.showVendorInfo ? (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={item => item._id}
            data={this.props.data}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) =>
              <FilteredVendorBottomCardItem
                item={item}
                customRegion={this.props.customRegion}
                moveToPosition={() =>
                  this.props.moveToPosition(item._id, item.location.coordinates)
                }
                getDistanceFromCurrentLocation={
                  this.props.getDistanceFromCurrentLocation
                }
              />
            }
          />
        ) : (
          <View style={styles.vendorInfoHolder}>
            <View style={styles.contentHolder}>
              <View style={styles.vendorIconHolder}>
                <Image
                  source={{ uri: this.state.item.avatarURL }}
                  style={styles.vendorIcon}
                />
              </View>
              <View style={styles.vendorContentHolder}>
                <Text numberOfLines={1} style={styles.vendorName}>
                  {this.state.item.name}
                </Text>
                <Text style={styles.vendorAddress} numberOfLines={1}>
                  {this.state.item.location.city}, {this.state.item.location.region}
                </Text>
                <View style={[styles.statusHolder, styles.extraStatusHolderStyle]}>
                  <Image
                    source={require("../../../assets/images/open_restaurant_status.png")}
                    style={styles.statusImage}
                  />
                  <Text style={[styles.status, styles.extraStatusStyle]}>Open Now</Text>
                </View>
              </View>
            </View>

            <View style={styles.vendorInfoSectionSeparator} />

            <View style={[styles.contentHolder, styles.extraContentHolderStyle]}>
              <View style={styles.iconTextHolder}>
                <Feather name="corner-up-right" size={wp('6.4%')} color="white" />
                <Text style={styles.milesText} numberOfLines={1}>0.32 miles away</Text>
              </View>

              <Button
                style={buttonStyles.goBtn}
                textStyle={buttonStyles.goBtnText}
                onPress={() => this.callMethod(this.state.item)}
              >
                Go
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

FilteredVendorBottomCard.propTypes = {
  data: PropTypes.array.isRequired
};

const buttonStyles = {
  goBtn: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A',
    width: wp('29.86%'),
    height: wp('11.73%'),
    borderRadius: 8,
    justifyContent: 'center'
  },
  goBtnText: {
    fontSize: wp('4%'),
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    paddingTop: 0,
    paddingBottom: 0
  }
};

export default FilteredVendorBottomCard;
