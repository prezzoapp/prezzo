// @flow
import * as React from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon as NativeBaseIcon, Picker, Spinner } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';
import ProfileTextInput from '../../../components/ProfileTextInput';
import ProfileDataField from '../../../components/ProfileDataField';
import EditableListItem from '../../../components/EditableListItem';
import { restaurantCategories } from '../../../services/constants';
import styles, { stylesRaw } from './styles';
import FilterItem from '../../../components/FilterItem';

export default class AccountInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: props => (
      <Icon name="person-outline" size={24} color={props.tintColor} />
    ),
    title: 'Vendor Account',
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
  });

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { avatarURL, vendor } = props;

    const location = vendor.get('location');

    this.state = {
      avatarURL,
      categories: vendor.get('categories').toJS() || [],
      hours: vendor.get('hours').toJS() || [],
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
      email: 'steven@sagebistro.com'
    };

    console.log(this.state.hours); //GOT CORRECT VALUE

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // this.props.navigation.setParams({ save: this.save.bind(this) });
    this.constructor.currentContext = this;
  }

  showAvatarActionSheet() {
    ImagePicker.showImagePicker({
      maxWidth: 800,
      title: 'Select an avatar',
      quality: 0.3
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image response: ', response);
        this.setState({
          avatarURL: response.uri,
          upload: response
        });
      }
    });
  }

  addSelectedCategory() {
    //console.log('addSelectedCategory()');
    const {categories, selectedCategory} = this.state;

    if (categories.indexOf(selectedCategory) > 0) {
      return;
    }

    const newCategories = [...categories];
    newCategories.push(selectedCategory);

    console.log('newCategories', newCategories);

    this.setState({categories: newCategories});
  }

  removeCategoryAtIndex(index) {
    const {categories} = this.state;
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    this.setState({categories: newCategories});
  }

  addSelectedHoursOfOperation() {
    const {
      hours,
      selectedHoursDay,
      selectedClosingTime,
      selectedOpeningTime
    } = this.state;

    const dayOfWeek = parseInt(selectedHoursDay);

    console.log("Day of week: ", dayOfWeek);

    const closeTimeSplit = selectedClosingTime.split(':');
    const closeTimeHour = parseInt(closeTimeSplit[0]);
    const closeTimeMinutes = parseInt(closeTimeSplit[1]);

    const openTimeSplit = selectedOpeningTime.split(':');
    const openTimeHour = parseInt(openTimeSplit[0]);
    const openTimeMinutes = parseInt(openTimeSplit[1]);

    const newHours = [...hours];

    //console.log(newHours.length);

    if(newHours.length === 0) {
      newHours.push({
        dayOfWeek,
        closeTimeHour,
        closeTimeMinutes,
        openTimeHour,
        openTimeMinutes
      });

      console.log(newHours);

      this.setState(() => {
        return {
          hours: newHours
        }
      });
    } else {
      for (let i = 0; i < newHours.length; i++) {
        if (
          dayOfWeek === newHours[i].dayOfWeek &&
          ((openTimeHour >= newHours[i].openTimeHour &&
            openTimeHour <= newHours[i].closeTimeHour) ||
            (closeTimeHour >= newHours[i].openTimeHour &&
              closeTimeHour <= newHours[i].closeTimeHour) ||
            (openTimeHour <= newHours[i].openTimeHour &&
              closeTimeHour >= newHours[i].closeTimeHour && newHours[i].closeTimeHour !== 0))
        ) {
          console.log('Invalid day.');
          console.log("I: ", i);
          break;
        } else if (i === newHours.length - 1) {
          console.log("I: ", i);
          newHours.push({
            dayOfWeek,
            closeTimeHour,
            closeTimeMinutes,
            openTimeHour,
            openTimeMinutes
          });

          console.log(newHours);

          this.setState(() => {
            return {
              hours: newHours
            }
          });

          break;
        }
      }
    }
  }

  removeHoursOfOperationAtIndex(index) {
    const { hours } = this.state;
    const newHours = [...hours];
    newHours.splice(index, 1);
    this.setState({ hours: newHours });
  }

  async uploadPhoto() {
    if (!this.state.upload) {
      return;
    }

    const { upload } = this.state;
    const { fileName, fileSize, uri } = upload;

    await this.props.uploadImage(
      uri,
        fileSize,
        'image/jpeg',
        fileName,
        'userAvatar',
        'public-read'
      ).then(async avatarURL => {
        console.log('got avatarURL', avatarURL);

        this.setState({
          avatarURL,
          upload: null
        });
    });
  }

  async save() {
    const {vendor, isBusy, createVendor, updateVendor} = this.props;

    if (isBusy) {
      console.log('is busy');
      return;
    }

    try {
      await this.uploadPhoto();

      const params = { ...this.state };
      delete params.upload;

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
      console.warn('error creating or updating vendor', e);
    }
  }

  navigateToMapView() {
    this.props.navigate({
      routeName: 'LocationSearch',
      params: {
        onSelect: location => {
          console.log('got location', location);
          this.setState({location});
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
      this.state.filters.splice(this.state.filters.findIndex(x => x.id === id), 1);
    } else {
      this.state.filters.push({
        id,
        name
      });
    }

    this.setState(() => {
      return {
        filters: this.state.filters
      };
    });

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
          style={{...stylesRaw.spinnerContainer,
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
            <Image style={styles.avatar}
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => alert()} style={styles.editBtn}>
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
              label='Business Name'
              onChange={val => this.setState({name: val})}
              placeholder=''
              showInputBottomBorder={false}
              type='name'
              value={name}
            />
            <ProfileTextInput
              label='Web Address'
              onChange={val => this.setState({website: val})}
              placeholder=''
              showInputBottomBorder={false}
              type='url'
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

              const closeTime = `${closeTimeHour}:${closeTimeMinutes}`;
              const openTime = `${openTimeHour}:${openTimeMinutes}`;

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
                mode='dropdown'
                iosHeader='Select a day'
                iosIcon={
                  <NativeBaseIcon
                    name='ios-arrow-down-outline'
                    style={stylesRaw.pickerIcon}
                  />
                }
                style={styles.hoursPicker}
                textStyle={styles.hoursPickerText}
                selectedValue={selectedHoursDay}
                onValueChange={val => this.setState({ selectedHoursDay: val })}
              >
                {pickerOptionsForDay.map((value, index) =>
                  <Picker.Item label={value} value={index} key={index} />
                )}
              </Picker>

              <Picker
                mode='dropdown'
                iosHeader='Select an opening time'
                iosIcon={
                  <NativeBaseIcon
                    name='ios-arrow-down-outline'
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
                {pickerOptionsForTime.map((option, index) =>
                  <Picker.Item
                    label={option.label}
                    value={option.value}
                    key={index}
                  />
                )}
              </Picker>

              <Picker
                mode='dropdown'
                iosHeader='Select a closing time'
                iosIcon={
                  <NativeBaseIcon
                    name='ios-arrow-down-outline'
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
                {pickerOptionsForTime.map((option, index) =>
                  <Picker.Item
                    label={option.label}
                    value={option.value}
                    key={index}
                  />
                )}
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
            {categories.map((category, index) =>
              <EditableListItem
                key={index}
                text={category}
                onRemove={() => this.removeCategoryAtIndex(index)}
              />
            )}

            <View style={styles.pickerContainer}>
              <Picker
                mode='dropdown'
                iosHeader='Select a category'
                iosIcon={
                  <NativeBaseIcon
                    name='ios-arrow-down-outline'
                    style={stylesRaw.pickerIcon}
                  />
                }
                style={styles.hoursPicker}
                textStyle={styles.hoursPickerText}
                selectedValue={selectedCategory}
                onValueChange={val => this.setState({selectedCategory: val})}
              >
                {restaurantCategories.map((value, index) =>
                  <Picker.Item label={value} value={value} key={index} />
                )}
              </Picker>

              <TouchableOpacity onPress={() => this.addSelectedCategory()}>
                <Text style={styles.addText}>Add Category</Text>
              </TouchableOpacity>
            </View>
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
              if(item.id === 1) {
                return (
                  <Slider
                    key={item.id}
                    minimumValue={0}
                    maximumValue={100}
                    step={parseFloat((100 / 3).toFixed(2))}
                    minimumTrackTintColor="rgb(47,212,117)"
                    maximumTrackTintColor="rgb(230,230,230)"
                    thumbTintColor="rgb(255,254,255)"
                    thumbStyle={{ height: 18, width: 18 }}
                    onValueChange={value => console.log(value)}
                    trackStyle={{ height: 3 }}
                  />
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
