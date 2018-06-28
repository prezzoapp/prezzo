// @flow
import * as React from 'react';
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon as NativeBaseIcon, Picker} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileTextInput from '../../components/ProfileTextInput';
import ProfileDataField from '../../components/ProfileDataField';
import EditableListItem from '../../components/EditableListItem';
import {restaurantCategories} from '../../services/constants';
import styles, {stylesRaw} from './styles';

export default class VendorAccountInfo extends React.Component {
  // stupid hack to get static functions to get
  // reference to instance method;
  // to get over this, we need to upgrade `react-navigation`
  static currentContext = null;

  static displayName = 'Profile';

  static navigationOptions = {
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
    ),
    title: 'Vendor Account',
    headerStyle: {
      position: 'absolute',
      backgroundColor: '#2B2C2C',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
    headerTintColor: '#fff',
    headerRight: (
      <Button
        color='#fff'
        onPress={() => VendorAccountInfo.currentContext.save()}
        title='Save'
      />
    )
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {
      avatarURL = null,
      categories = [],
      hoursOfOperation = [],
      location = {
        address: '123 Main St',
        city: 'Los Angeles',
        country: 'United States',
        region: 'California',
        postalCode: '90291'
      },
      name = '',
      website = ''
    } = props;

    this.state = {
      avatarURL,
      categories,
      hoursOfOperation,
      location,
      name,
      selectedHoursDay: 0,
      selectedCategory: restaurantCategories[0],
      selectedClosingTime: '18:00',
      selectedOpeningTime: '10:00',
      website
    };
  }

  componentDidMount() {
    this.constructor.currentContext = this;
    console.log('setting currentContext', this.constructor.currentContext);
  }

  showAvatarActionSheet() {
    const options = {title: 'Select an avatar'};

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image URI: ', response.uri);
        this.setState({avatarURL: response.uri});
      }
    });
  }

  addSelectedCategory() {
    console.log('addSelectedCategory()');
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
      hoursOfOperation,
      selectedHoursDay,
      selectedClosingTime,
      selectedOpeningTime
    } = this.state;

    const dayOfWeek = selectedHoursDay;

    const closeTimeSplit = selectedClosingTime.split(':');
    const closeTimeHour = closeTimeSplit[0];
    const closeTimeMinutes = closeTimeSplit[1];

    const openTimeSplit = selectedOpeningTime.split(':');
    const openTimeHour = openTimeSplit[0];
    const openTimeMinutes = openTimeSplit[1];

    const newHours = [...hoursOfOperation];
    newHours.push({
      dayOfWeek,
      closeTimeHour,
      closeTimeMinutes,
      openTimeHour,
      openTimeMinutes
    });

    this.setState({hoursOfOperation: newHours});
  }

  removeHoursOfOperationAtIndex(index) {
    const {hoursOfOperation} = this.state;
    const newHours = [...hoursOfOperation];
    newHours.splice(index, 1);
    this.setState({hoursOfOperation: newHours});
  }

  save() {
    const {vendor, isBusy, createVendor, updateVendor} = this.props;

    if (isBusy) {
      console.log('is busy');
    } else if (vendor) {
      console.log('updating vendor');
      updateVendor(this.state);
    } else {
      console.log('create vendor');
      createVendor(this.state);
    }
  }

  render() {
    const {
      avatarURL,
      categories,
      hoursOfOperation,
      location,
      name,
      selectedHoursDay,
      selectedCategory,
      selectedClosingTime,
      selectedOpeningTime,
      website
    } = this.state;
    const {
      address,
      city,
      country,
      region,
      postalCode
    } = location;
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
      {label: '12 AM', value: '0:00'},
      {label: '1 AM', value: '1:00'},
      {label: '2 AM', value: '2:00'},
      {label: '3 AM', value: '3:00'},
      {label: '4 AM', value: '4:00'},
      {label: '5 AM', value: '5:00'},
      {label: '6 AM', value: '6:00'},
      {label: '7 AM', value: '7:00'},
      {label: '8 AM', value: '8:00'},
      {label: '9 AM', value: '9:00'},
      {label: '10 AM', value: '10:00'},
      {label: '11 AM', value: '11:00'},
      {label: '12 PM', value: '12:00'},
      {label: '1 PM', value: '13:00'},
      {label: '2 PM', value: '14:00'},
      {label: '3 PM', value: '15:00'},
      {label: '4 PM', value: '16:00'},
      {label: '5 PM', value: '17:00'},
      {label: '6 PM', value: '18:00'},
      {label: '7 PM', value: '19:00'},
      {label: '8 PM', value: '20:00'},
      {label: '9 PM', value: '11:00'},
      {label: '10 PM', value: '12:00'},
      {label: '11 PM', value: '23:00'}
    ];

    return (
      <ScrollView
        contentContainerStyle={styles.containerContentStyle}
        style={styles.container}
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.avatarWrap}
            onPress={() => this.showAvatarActionSheet()}
          >
            <Image style={styles.avatar}
              source={
                avatarURL
                ? {uri: avatarURL}
                : require('../../../assets/images/etc/default-avatar.png')
              }
            />
            <Image
              style={styles.editAvatarIcon}
              source={require('../../../assets/images/icons/edit.png')}
            />
          </TouchableOpacity>
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
          </View>
          <View style={styles.sectionBody}>
            <ProfileDataField
              label='Address'
              value={address}
            />
            <ProfileDataField
              label='City'
              value={city}
            />
            <ProfileDataField
              label='State'
              value={region}
            />
            <ProfileDataField
              label='Zip'
              value={postalCode}
            />
            <ProfileDataField
              label='Country'
              value={country}
            />
          </View>
        </View>

        <View style={styles.hoursContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Hours</Text>
          </View>
          <View style={styles.hoursSectionBody}>
            {
              hoursOfOperation.map((hour, index) => {
                const {
                  dayOfWeek,
                  closeTimeHour,
                  closeTimeMinutes,
                  openTimeHour,
                  openTimeMinutes
                } = hour;
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
              })
            }

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
                onValueChange={val => this.setState({selectedHoursDay: val})}
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
                onValueChange={val => this.setState({selectedOpeningTime: val})}
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
                onValueChange={val => this.setState({selectedClosingTime: val})}
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
            {
              categories.map((category, index) =>
                <EditableListItem
                  key={index}
                  text={category}
                  onRemove={() => this.removeCategoryAtIndex(index)}
                />
              )
            }

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
      </ScrollView>
    );
  }
}
