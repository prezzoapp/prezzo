// // @flow
import * as React from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActionSheetIOS
} from 'react-native';
import PropTypes from 'prop-types';
import { Picker, Spinner } from 'native-base';
import Slider from 'react-native-slider';
import { ImagePicker, Permissions } from 'expo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '../../../components/VectorIcons';
import { getTimeStampString } from '../../../services/commonFunctions';
import ProfileTextInput from '../../../components/ProfileTextInput';
import ProfileDataField from '../../../components/ProfileDataField';
import EditableListItem from '../../../components/EditableListItem';
import showGenericAlert from '../../../components/GenericAlert';
import { restaurantCategories, COLOR_GREEN } from '../../../services/constants';
import styles, { stylesRaw } from './styles';
import FilterItem from '../../../components/FilterItem';

const price2Indicator = wp('85%') * 0.33 - wp('6.66%');

const price3Indicator = wp('85%') * 0.66 - wp('9.5%');

const price4Indicator = wp('85%') * 0.99 - wp('9.5%');

export default class AccountInfo extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      position: 'relative',
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerRight: (
      <Button
        color="#fff"
        onPress={() => AccountInfo.currentContext.save()}
        title="Save"
      />
    )
  };

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    avatarURL: PropTypes.string.isRequired,
    vendor: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const { avatarURL, vendor } = props;
    // temp_restaurantCategories = [...restaurantCategories];

    if (!vendor) {
      this.state = {
        temp_restaurantCategories: [...restaurantCategories],
        avatarURL,
        categories: [],
        hours: [],
        location: {},
        name: '',
        slidervalue: 0.0,
        selectedHoursDay: 0,
        selectedCategory: restaurantCategories[0],
        selectedClosingTime: '18:00',
        selectedOpeningTime: '10:00',
        upload: null,
        website: '',
        filters: [],
        email: ''
      };

      return;
    }

    const location = vendor.get('location');
    // temp_restaurantCategories = [...restaurantCategories];

    this.state = {
      temp_restaurantCategories: [...restaurantCategories],
      avatarURL,
      categories: vendor.get('categories').toJS() || [],
      hours: vendor.get('hours').toJS() || [],
      slidervalue: 0.0,
      location: {
        address: location.get('address') || '',
        city: location.get('city') || '',
        country: location.get('country') || '',
        region: location.get('region') || '',
        postalCode: location.get('postalCode') || '',
        latitude:
          location.get('latitude') ||
          location.get('coordinates').get(1) ||
          null,
        longitude:
          location.get('longitude') ||
          location.get('coordinates').get(0) ||
          null
      },
      name: vendor.get('name') || '',
      selectedHoursDay: 0,
      selectedCategory: restaurantCategories[0],
      selectedClosingTime: '18:00',
      selectedOpeningTime: '10:00',
      upload: null,
      website: vendor.get('website') || '',
      filters: [],
      email: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.constructor.currentContext = this;
  }

  showAvatarActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Take Photo', 'Choose from Library', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Select an avatar'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.requestCameraPermission();
        } else if (buttonIndex === 1) {
          this.requestPhotoLibraryPermission();
        }
      }
    );
  }

  requestPhotoLibraryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.openImageGallery()
    }
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.openCamera();
    }
  };

  openImageGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3
    });
    if (!result.cancelled) {
      this.setState({ upload: result, avatarURL: result.uri });
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3
    });

    if (!result.cancelled) {
      this.setState({ upload: result, avatarURL: result.uri });
    }
  }

  addSelectedCategory() {
    const { categories, selectedCategory } = this.state;

    if (categories.indexOf(selectedCategory) > 0) {
      return;
    }

    const newCategories = [...categories];
    newCategories.push(selectedCategory);

    this.setState({ categories: newCategories });

    const array = this.state.temp_restaurantCategories;
    const index = array.indexOf(selectedCategory);
    array.splice(index, 1);
    this.setState(() => ({
      temp_restaurantCategories: array,
      selectedCategory: array[0]
    }));
  }

  removeCategoryAtIndex(index) {
    const { categories } = this.state;
    const newCategories = [...categories];

    newCategories.splice(index, 1);
    this.setState(() => ({
      categories: newCategories
    }));

    const array = [...restaurantCategories]; // make a separate copy of the array

    for (let i = 0; i < newCategories.length; i++) {
      const selCategoryValue = newCategories[i];
      const selectedIndex = array.indexOf(selCategoryValue);
      array.splice(selectedIndex, 1);
    }

    this.setState(() => ({
      temp_restaurantCategories: array,
      selectedCategory: array[0]
    }));
  }

  checkCloseBeforeOpen(openTimeHour, closeTimeHour) {
    if (closeTimeHour <= openTimeHour) {
      return true;
    }

    return false;
  }

  checkSameDay(existingHours, dayOfWeek) {
    return existingHours.filter(item => item.dayOfWeek === dayOfWeek);
  }

  checkOpenHours(hours, openTimeHour) {
    for (let i = 0; i < hours.length; i++) {
      if (
        openTimeHour >= hours[i].openTimeHour &&
        openTimeHour <= hours[i].closeTimeHour
      ) {
        return true;
      }
    }
    return false;
  }

  checkCloseHours(hours, closeTimeHour) {
    for (let i = 0; i < hours.length; i++) {
      if (
        closeTimeHour >= hours[i].openTimeHour &&
        closeTimeHour <= hours[i].closeTimeHour
      ) {
        return true;
      }
    }
    return false;
  }

  checkIntervalHours(hours, openTimeHour, closeTimeHour) {
    const selectedSlot = new Set(
      Array.from(
        { length: closeTimeHour - openTimeHour + 1 },
        (v, i) => openTimeHour + i
      )
    );
    for (let i = 0; i < hours.length; i++) {
      const slot = new Set(
        Array.from(
          { length: hours[i].closeTimeHour - hours[i].openTimeHour + 1 },
          (v, j) => hours[i].openTimeHour + j
        )
      );
      const intersection = new Set([...selectedSlot].filter(x => slot.has(x)));
      if (intersection.size >= 2) {
        return true;
      }
    }
    return false;
  }

  addSelectedHoursOfOperation() {
    const {
      hours,
      selectedHoursDay,
      selectedClosingTime,
      selectedOpeningTime
    } = this.state;

    const dayOfWeek = parseInt(selectedHoursDay);

    const closeTimeSplit = selectedClosingTime.split(':');
    const closeTimeHour = parseInt(closeTimeSplit[0]);
    const closeTimeMinutes = parseInt(closeTimeSplit[1]);

    const openTimeSplit = selectedOpeningTime.split(':');
    const openTimeHour = parseInt(openTimeSplit[0]);
    const openTimeMinutes = parseInt(openTimeSplit[1]);

    const newHours = [...hours];

    if (newHours.length === 0) {
      if (this.checkCloseBeforeOpen(openTimeHour, closeTimeHour) === false) {
        newHours.push({
          dayOfWeek,
          closeTimeHour,
          closeTimeMinutes,
          openTimeHour,
          openTimeMinutes
        });

        this.setState(() => ({
          hours: newHours
        }));
      }
    } else if (
      this.checkCloseBeforeOpen(openTimeHour, closeTimeHour) ||
      this.checkOpenHours(
        this.checkSameDay(newHours, dayOfWeek),
        openTimeHour
      ) ||
      this.checkCloseHours(
        this.checkSameDay(newHours, dayOfWeek),
        closeTimeHour
      ) ||
      this.checkIntervalHours(
        this.checkSameDay(newHours, dayOfWeek),
        openTimeHour,
        closeTimeHour
      ) !== false
    ) {
      return false;
    } else {
      newHours.push({
        dayOfWeek,
        closeTimeHour,
        closeTimeMinutes,
        openTimeHour,
        openTimeMinutes
      });

      this.setState(() => ({
        hours: newHours
      }));
    }

    this.checkIntervalHours(newHours, openTimeHour, closeTimeHour);
  }

  removeHoursOfOperationAtIndex(index) {
    const { hours } = this.state;
    const newHours = [...hours];
    newHours.splice(index, 1);
    this.setState({ hours: newHours });
  }

  openTimeFormat(hour, minutes) {
    if (hour < 12 && hour !== 0) {
      return `${hour}:${minutes} AM`;
    } else if (hour === 0) {
      return `12:${minutes} AM`;
    } else if (hour === 12) {
      return `12:${minutes} PM`;
    }
    return `${hour - 12}:${minutes} PM`;
  }

  closeTimeFormat(hour, minutes) {
    if (hour < 12) {
      return `${hour}:${minutes} AM`;
    } else if (hour === 12) {
      return `12:${minutes} PM`;
    }
    return `${hour - 12}:${minutes} PM`;
  }

  async uploadPhoto() {
    if (!this.state.upload) {
      return;
    }

    const { upload } = this.state;
    const { uri } = upload;
    const fileName = `${getTimeStampString()}.jpg`;

    await this.props
      .uploadImage(uri, 10, 'image/jpeg', fileName, 'userAvatar', 'public-read')
      .then(async avatarURL => {
        console.log('got avatarURL', avatarURL);

        this.setState({
          avatarURL,
          upload: null
        });
      });
  }

  async save() {
    const { vendor, isBusy, createVendor, updateVendor } = this.props;

    if (isBusy) {
      console.log('is busy');
      return;
    }

    try {
      await this.uploadPhoto();

      const params = { ...this.state };
      delete params.upload;

      if (!params.avatarURL) {
        delete params.avatarURL;
      }

      if (vendor) {
        console.log('updating vendor');
        await updateVendor(vendor.get('_id'), params);
      } else {
        console.log('create vendor');
        await createVendor(params);
      }

      // PATCH: don't navigate back on success
      //        makes it easier to debug
      // TODO: uncomment line under this
      // this.props.navigateBack();
      // END PATCH
    } catch (e) {
      showGenericAlert('Uh-oh!', e.message || e);
    }
  }

  navigateToMapView() {
    this.props.navigate({
      routeName: 'LocationSearch',
      params: {
        onSelect: location => {
          console.log('got location', location);
          this.setState({ location });
        },
        onError: () => {
          console.log('error getting location');
        }
      }
    });
  }

  toggle(id, name) {
    // const filterIndex = this.filters[this.filters.findIndex(x => x.id === id)];

    if (this.state.filters.length === 0) {
      this.state.filters.push({
        id,
        name
      });
    } else if (this.state.filters.findIndex(x => x.id === id) !== -1) {
      this.state.filters.splice(
        this.state.filters.findIndex(x => x.id === id),
        1
      );
    } else {
      this.state.filters.push({
        id,
        name
      });
    }

    this.setState(() => ({
      filters: this.state.filters
    }));

    console.log(this.state.filters);
  }

  render() {
    const { isBusy } = this.props;
    const {
      avatarURL,
      categories,
      hours,
      location,
      name,
      selectedHoursDay,
      selectedCategory,
      selectedClosingTime,
      selectedOpeningTime,
      website,
      email
    } = this.state;

    const { address, city, country, region, postalCode } = location;
    const pickerOptionsForDay = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    const pickerOptionsForTime = [
      { label: '12 AM', value: '0:00' },
      { label: '1 AM', value: '1:00' },
      { label: '2 AM', value: '2:00' },
      { label: '3 AM', value: '3:00' },
      { label: '4 AM', value: '4:00' },
      { label: '5 AM', value: '5:00' },
      { label: '6 AM', value: '6:00' },
      { label: '7 AM', value: '7:00' },
      { label: '8 AM', value: '8:00' },
      { label: '9 AM', value: '9:00' },
      { label: '10 AM', value: '10:00' },
      { label: '11 AM', value: '11:00' },
      { label: '12 PM', value: '12:00' },
      { label: '1 PM', value: '13:00' },
      { label: '2 PM', value: '14:00' },
      { label: '3 PM', value: '15:00' },
      { label: '4 PM', value: '16:00' },
      { label: '5 PM', value: '17:00' },
      { label: '6 PM', value: '18:00' },
      { label: '7 PM', value: '19:00' },
      { label: '8 PM', value: '20:00' },
      { label: '9 PM', value: '21:00' },
      { label: '10 PM', value: '22:00' },
      { label: '11 PM', value: '23:00' }
    ];

    return (
      <ScrollView
        contentContainerStyle={styles.containerContentStyle}
        style={styles.container}
      >
        <View
          style={{
            ...stylesRaw.spinnerContainer,
            ...(isBusy ? {} : { display: 'none' })
          }}
        >
          <Spinner color="red" />
        </View>

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarWrap}
            onPress={() => this.showAvatarActionSheet()}
          >
            <Image
              style={styles.avatar}
              source={
                avatarURL
                  ? { uri: avatarURL }
                  : require('../../../../assets/images/etc/default-avatar.png')
              }
            />
            <Image
              style={styles.editAvatarIcon}
              source={require('../../../../assets/images/icons/edit.png')}
            />
          </TouchableOpacity>

          <View style={styles.editInfoHolder}>
            <Text style={[styles.editText, { color: 'white' }]}>
              Add / Change Logo
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={styles.editBtn}
            >
              <Text style={styles.editText}>Edit Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Contact</Text>
          </View>
          <View style={styles.sectionBody}>
            <ProfileTextInput
              label="Business Name"
              onChange={val => this.setState({ name: val })}
              placeholder=""
              showInputBottomBorder={false}
              type="name"
              value={name}
            />
            <ProfileTextInput
              label="Web Address"
              onChange={val => this.setState({ website: val })}
              placeholder=""
              showInputBottomBorder={false}
              type="url"
              value={website}
            />
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Address</Text>

            <TouchableOpacity onPress={() => this.navigateToMapView()}>
              <Text style={styles.addText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionBody}>
            <ProfileDataField label="Address" value={address} />
            <ProfileDataField label="City" value={city} />
            <ProfileDataField label="State" value={region} />
            <ProfileDataField label="Zip" value={postalCode} />
            <ProfileDataField label="Country" value={country} />
          </View>
        </View>

        <View style={styles.hoursContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Hours</Text>
          </View>
          <View style={styles.hoursSectionBody}>
            {hours.map((hour, index) => {
              let {
                dayOfWeek,
                closeTimeHour,
                closeTimeMinutes,
                openTimeHour,
                openTimeMinutes
              } = hour;

              if (closeTimeMinutes === 0) {
                closeTimeMinutes = '00';
              }

              if (openTimeMinutes === 0) {
                openTimeMinutes = '00';
              }

              const openTime = this.openTimeFormat(
                openTimeHour,
                openTimeMinutes
              );

              const closeTime = this.closeTimeFormat(
                closeTimeHour,
                closeTimeMinutes
              );

              let readableDayOfWeek = '';

              if (dayOfWeek === 0) {
                readableDayOfWeek = 'Sun';
              } else if (dayOfWeek === 1) {
                readableDayOfWeek = 'Mon';
              } else if (dayOfWeek === 2) {
                readableDayOfWeek = 'Tue';
              } else if (dayOfWeek === 3) {
                readableDayOfWeek = 'Wed';
              } else if (dayOfWeek === 4) {
                readableDayOfWeek = 'Thu';
              } else if (dayOfWeek === 5) {
                readableDayOfWeek = 'Fri';
              } else if (dayOfWeek === 6) {
                readableDayOfWeek = 'Sat';
              }

              const text = `${readableDayOfWeek} ${openTime} - ${closeTime}`;

              return (
                <EditableListItem
                  key={index}
                  text={text}
                  onRemove={() => this.removeHoursOfOperationAtIndex(index)}
                />
              );
            })}

            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                iosHeader="Select a day"
                iosIcon={
                  <Ionicons
                    name="ios-arrow-down-outline"
                    style={stylesRaw.pickerIcon}
                  />
                }
                style={styles.hoursPicker}
                textStyle={styles.hoursPickerText}
                selectedValue={selectedHoursDay}
                onValueChange={val => this.setState({ selectedHoursDay: val })}
              >
                {pickerOptionsForDay.map((value, index) => (
                  <Picker.Item label={value} value={index} key={index} />
                ))}
              </Picker>

              <Picker
                mode="dropdown"
                iosHeader="Select an opening time"
                iosIcon={
                  <Ionicons
                    name="ios-arrow-down-outline"
                    style={stylesRaw.pickerIcon}
                  />
                }
                style={styles.hoursPicker}
                textStyle={styles.hoursPickerText}
                selectedValue={selectedOpeningTime}
                onValueChange={val =>
                  this.setState({ selectedOpeningTime: val })
                }
              >
                {pickerOptionsForTime.map((option, index) => (
                  <Picker.Item
                    label={option.label}
                    value={option.value}
                    key={index}
                  />
                ))}
              </Picker>

              <Picker
                mode="dropdown"
                iosHeader="Select a closing time"
                iosIcon={
                  <Ionicons
                    name="ios-arrow-down-outline"
                    style={stylesRaw.pickerIcon}
                  />
                }
                style={styles.hoursPicker}
                textStyle={styles.hoursPickerText}
                selectedValue={selectedClosingTime}
                onValueChange={val =>
                  this.setState({ selectedClosingTime: val })
                }
              >
                {pickerOptionsForTime.map((option, index) => (
                  <Picker.Item
                    label={option.label}
                    value={option.value}
                    key={index}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              onPress={() => this.addSelectedHoursOfOperation()}
              style={styles.addTextContainer}
            >
              <Text style={styles.addText}>Add Time</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Categories</Text>
          </View>
          <View style={styles.categoriesSectionBody}>
            {categories.map((category, index) => (
              <EditableListItem
                key={index}
                text={category}
                onRemove={() => this.removeCategoryAtIndex(index)}
              />
            ))}
            {(() => {
              if (this.state.temp_restaurantCategories.length != 0) {
                return (
                  <View style={styles.pickerContainer}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select a category"
                      iosIcon={
                        <Ionicons
                          name="ios-arrow-down-outline"
                          style={stylesRaw.pickerIcon}
                        />
                      }
                      style={styles.hoursPicker}
                      textStyle={styles.hoursPickerText}
                      selectedValue={selectedCategory}
                      onValueChange={val =>
                        this.setState({ selectedCategory: val })
                      }
                    >
                      {this.state.temp_restaurantCategories.map(
                        (value, index) => (
                          <Picker.Item
                            label={value}
                            value={value}
                            key={index}
                          />
                        )
                      )}
                    </Picker>

                    <TouchableOpacity
                      onPress={() => this.addSelectedCategory()}
                    >
                      <Text style={styles.addText}>Add Category</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
              return null;
            })()}
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Search Filters</Text>
          </View>
          <Text style={styles.sectionSubHeaderText}>
            Select the options your location offers
          </Text>

          <View style={styles.filtersHolder}>
            <View style={styles.commonFilterPanel}>
              <FilterItem
                name="Price"
                image={require('../../../../assets/images/filters/dollar-sign-icon.png')}
                style={{ marginBottom: 8 }}
                toggleFilter={() => this.toggle(1, 'Price')}
              />

              <FilterItem
                name="Wifi"
                image={require('../../../../assets/images/filters/wifi-icon.png')}
                style={{ marginBottom: 8 }}
                toggleFilter={() => this.toggle(2, 'Wifi')}
              />

              <FilterItem
                name="Delivery"
                image={require('../../../../assets/images/filters/delivery.png')}
                style={{ marginBottom: 8 }}
                toggleFilter={() => this.toggle(3, 'Delivery')}
              />
            </View>

            {this.state.filters.map(item => {
              if (item.id === 1) {
                return (
                  <View
                    key={item.id}
                    style={{
                      flex: 1,
                      height: 50,
                      marginRight: 15,
                      marginTop: 10,
                      marginBottom: 15,
                      position: 'relative',
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        width: wp('13.33%'),
                        height: 50,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        zIndex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: COLOR_GREEN,
                          fontSize: 17,
                          width: wp('13.33%'),
                          height: 20
                        }}
                      >
                        $
                      </Text>

                      <View
                        style={[
                          styles.priceBarIndicator,
                          {
                            backgroundColor:
                              this.state.slidervalue > 0.0
                                ? 'rgba(255,255,255,1.0)'
                                : null
                          }
                        ]}
                      />
                    </View>

                    <View
                      style={{
                        width: wp('13.33%'),
                        left: price2Indicator,
                        position: 'absolute',
                        height: 50,
                        flexDirection: 'column',
                        zIndex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 17,
                            height: 20,
                            textAlign: 'center',
                            width: wp('13.33%')
                          },
                          {
                            color:
                              this.state.slidervalue >= 33.3
                                ? COLOR_GREEN
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      >
                        $$
                      </Text>

                      <View
                        style={[
                          styles.priceBarIndicator,
                          {
                            backgroundColor:
                              this.state.slidervalue === 33.33
                                ? null
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      />
                    </View>

                    <View
                      style={{
                        width: wp('13.33%'),
                        position: 'absolute',
                        left: price3Indicator,
                        height: 50,
                        flexDirection: 'column',
                        zIndex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 17,
                            height: 20,
                            marginLeft: 2,
                            textAlign: 'center',
                            width: wp('13.33%')
                          },
                          {
                            color:
                              this.state.slidervalue >= 66.6
                                ? COLOR_GREEN
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      >
                        $$$
                      </Text>

                      <View
                        style={[
                          styles.priceBarIndicator,
                          {
                            backgroundColor:
                              this.state.slidervalue === 66.66
                                ? null
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      />
                    </View>

                    <View
                      style={{
                        width: wp('13.33%'),
                        height: 50,
                        position: 'absolute',
                        left: price4Indicator,
                        flexDirection: 'column',
                        zIndex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 17,
                            height: 20,
                            textAlign: 'center',
                            width: wp('13.33%')
                          },
                          {
                            color:
                              this.state.slidervalue >= 99
                                ? COLOR_GREEN
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      >
                        $$$$
                      </Text>

                      <View
                        style={[
                          styles.priceBarIndicator,
                          {
                            backgroundColor:
                              this.state.slidervalue >= 99.9
                                ? null
                                : 'rgba(255,255,255,1.0)'
                          }
                        ]}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        zIndex: 10,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -12
                      }}
                    >
                      <Slider
                        minimumValue={0}
                        maximumValue={100}
                        step={parseFloat((100 / 3).toFixed(2))}
                        minimumTrackTintColor="rgb(47,212,117)"
                        maximumTrackTintColor="rgb(230,230,230)"
                        thumbTintColor="rgb(255,254,255)"
                        thumbStyle={{ height: 18, width: 18 }}
                        onValueChange={value => console.log('slider running')}
                        onSlidingComplete={value =>
                          this.setState({ slidervalue: value }, () => {
                            console.log(value);
                          })
                        }
                        onSlidingStart={value =>
                          this.state.slidervalue >= 99.9
                            ? this.setState({ slidervalue: value - 0.1 })
                            : this.setState({ slidervalue: value + 0.1 })
                        }
                        trackStyle={{ height: 3 }}
                      />
                    </View>
                  </View>
                );
              }
            })}

            <View style={styles.commonFilterPanel}>
              <FilterItem
                name="Breakfast"
                image={require('../../../../assets/images/filters/breakfast.png')}
                style={{ marginTop: 8 }}
                toggleFilter={() => this.toggle(4, 'Breakfast')}
              />

              <FilterItem
                name="Lunch"
                image={require('../../../../assets/images/filters/lunch_filter.png')}
                style={{ marginTop: 8 }}
                toggleFilter={() => this.toggle(5, 'Lunch')}
              />

              <FilterItem
                name="Dinner"
                image={require('../../../../assets/images/filters/dinner_filter.png')}
                style={{ marginTop: 8 }}
                toggleFilter={() => this.toggle(6, 'Dinner')}
              />

              <FilterItem
                name="Coffee"
                image={require('../../../../assets/images/filters/coffee_filter.png')}
                style={{ marginTop: 8 }}
                toggleFilter={() => this.toggle(7, 'Coffee')}
              />
            </View>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Submit</Text>
          </View>
          <Text style={styles.sectionSubHeaderText}>
            We will send you an email to verify your information
          </Text>

          <ProfileTextInput
            showLabel={false}
            label=""
            style={{ marginTop: 20 }}
            onChange={val => this.setState({ email: val })}
            placeholder=""
            keyboardType="email-address"
            type="name"
            showInputBottomBorder
            borderBottomColor="rgba(255,255,255,0.53)"
            value={email}
          />
        </View>
      </ScrollView>
    );
  }
}
