// @flow
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './styles';

class LocationSearch extends React.Component {
  static navigationOptions = {
    title: 'Location Search',
    headerStyle: {
      backgroundColor: '#2B2C2C',
      zIndex: 100
    },
    headerTintColor: '#fff'
  };

  navigateBack(location) {
    if (
      this.props && this.props.navigation && this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.onSelect
    ) {
      this.props.navigation.state.params.onSelect(location);
    }

    this.props.navigateBack();
  }

  parseResult(result) {
    // console.log('got result data', result);

    const {address_components, geometry = {}} = result;
    const {location = {}} = geometry;
    const latitude = location.lat;
    const longitude = location.lng;

    let name;
    let streetNumber;
    let streetName;
    let city;
    let region;
    let regionShort;
    let country;
    let countryShort;
    let postalCode;

    for (let component of address_components) {
      let {long_name, short_name, types} = component;

      if (
        long_name && types && types[0] && types[0] === 'neighborhood'
      ) {
        city = long_name;
      } else if (
        !streetNumber && long_name && types && types[0] && types[0] === 'street_number'
      ) {
        streetNumber = long_name;
      } else if (
        !streetName && long_name && types && types[0] && types[0] === 'route'
      ) {
        streetName = long_name;
      } else if (
        long_name && types && types[0] && types[0] === 'locality'
      ) {
        city = long_name;
      } else if (
        !region && long_name && types && types[0] &&
        types[0] === 'administrative_area_level_1'
      ) {
        region = long_name;
        regionShort = short_name;
      } else if (
        !country && long_name && types && types[0] && types[0] === 'country'
      ) {
        country = long_name;
        countryShort = short_name;
      } else if (
        !postalCode && long_name && types && types[0] && types[0] === 'postal_code'
      ) {
        postalCode = long_name;
      }
    }

    this.navigateBack({
      name,
      address: `${streetNumber} ${streetName}`.trim(),
      city,
      region,
      regionShort,
      country,
      countryShort,
      postalCode,
      longitude,
      latitude
    });
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={3}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details) => {
          this.parseResult(details);
        }}
        getDefaultValue={() => ''}
        styles={styles}
        currentLocation={true}
        currentLocationLabel='Current Location'
        nearbyPlacesAPI='GooglePlacesSearch'
        query={{
          key: 'AIzaSyBhuq8RXrtTXm7e0TewsesDWW9e9CGJNYw',
          language: 'en'
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'food'
        }}
        debounce={200}
      />
    );
  }
}

export default LocationSearch;
