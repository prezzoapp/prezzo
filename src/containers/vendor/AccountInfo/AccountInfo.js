// // @flow
import * as React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { Picker, Spinner, ActionSheet } from 'native-base';
import Slider from 'react-native-slider';
import shorthash from 'shorthash';
import { ImagePicker, Permissions, ImageManipulator, FileSystem } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Feather } from '@expo/vector-icons';
import { getTimeStampString } from '../../../services/commonFunctions';
import ProfileTextInput from '../../../components/ProfileTextInput';
import ProfileDataField from '../../../components/ProfileDataField';
import EditableListItem from '../../../components/EditableListItem';
import { showAlertWithMessage } from '../../../services/commonFunctions';
import { restaurantCategories, COLOR_GREEN } from '../../../services/constants';
import styles, { stylesRaw } from './styles';
import FilterItem from '../../../components/FilterItem';
import Button from '../../../components/Button';
import LoadingComponent from '../../../components/LoadingComponent';
import CacheImage from '../../../components/CacheImage';
import { manuallyLogout } from '../../../services/commonFunctions';
import { isValidURL } from '../../../utils/validators';

const price2Indicator = wp('85%') * 0.33 - wp('8.5%');

const price3Indicator = wp('85%') * 0.66 - wp('11.8%');

const price4Indicator = wp('85%') * 0.99 - wp('13.5%');

import {
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_WHITE,
  SF_PRO_DISPLAY_REGULAR,
  SF_PRO_TEXT_BOLD
} from '../../../services/constants';

let disableBtn = false;

export default class AccountInfo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('65%'),
          fontSize: wp('5%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        Vendor Account
      </Text>
    ),
    headerStyle: {
      position: 'relative',
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTitleStyle: {
      fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_MEDIUM),
      fontSize: wp('6.4%')
    },
    headerTintColor: '#fff',
    // headerRight: (
    //   <Button
    //     onPress={() => AccountInfo.currentContext.save()}
    //     style={buttonStyles.saveBtn}
    //     textStyle={buttonStyles.saveBtnText}
    //   >Save</Button>
    // ),
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('7%')}
        />
      </TouchableOpacity>
    )
  });

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    avatarURL: PropTypes.string.isRequired,
    vendor: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    createVendor: PropTypes.func.isRequired,
    updateVendor: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { avatarURL, vendor } = props;

    if (!vendor) {
      this.state = {
        temp_restaurantCategories: [...restaurantCategories],
        avatarURL,
        categories: [],
        hours: [],
        location: {},
        name: '',
        pricing: 0,
        selectedHoursDay: 0,
        selectedCategory: restaurantCategories[0],
        selectedClosingTime: '18:00',
        selectedOpeningTime: '10:00',
        upload: null,
        website: '',
        filters: [],
        email: '',
        selectImageThroughImagePicker: false
      };

      return;
    }

    const location = vendor.get('location');

    this.state = {
      temp_restaurantCategories: [...restaurantCategories],
      avatarURL,
      categories: vendor.get('categories').toJS() || [],
      hours: vendor.get('hours').toJS() || [],
      pricing: vendor.get('pricing') - 1 || 0,
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
      filters: vendor.get('filters').toJS() || [],
      email: '',
      selectImageThroughImagePicker: false,
      isFormValid: false
    };

    this.toggle = this.toggle.bind(this);
  }

  validForm() {
    console.log(this.state.website);
    if(
      this.state.avatarURL &&
      (this.state.avatarURL !== undefined || null || '') &&
      (this.state.name.trim() !== '') &&
      (this.state.website.trim() !== '') &&
      (isValidURL(this.state.website.trim())) &&
      this.state.location &&
      (this.state.location.address !== undefined || '') &&
      (this.state.location.city !== undefined || '') &&
      (this.state.location.country !== undefined || '') &&
      (this.state.location.region !== undefined || '') &&
      (this.state.location.postalCode !== undefined || '') &&
      (this.state.hours.length !== 0) &&
      (this.state.categories.length !== 0)
    ) {
      console.log('Button enabled!');
      this.setState({
        isFormValid: true
      });
    } else {
      console.log('Button disabled!');
      this.setState({
        isFormValid: false
      });
    }
  }

  componentDidMount() {
    // this.constructor.currentContext = this;

    const newCategories = this.state.temp_restaurantCategories
    .filter(val => !this.state.categories.includes(val));

    this.setState(() => {
      return {
        temp_restaurantCategories: newCategories,
        selectedCategory: newCategories[0]
      }
    }, () => {
      this.validForm();
    });
  }

  showAvatarActionSheet = () => {
    ActionSheet.show(
      {
        options: ['Take Photo', 'Choose from Library', 'Cancel'],
        cancelButtonIndex: 2,
        title: "Select an avatar"
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
      const resultEdited = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 250 }}],
        { format: 'jpeg', compress: 0.3 }
      );
      this.setState({
        selectImageThroughImagePicker: true
      }, () => {
        this.setState({
          upload: resultEdited,
          avatarURL: resultEdited.uri
        }, () => {
            this.validForm();
        });
      });
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3
    });
    if (!result.cancelled) {
      const resultEdited = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 250 }}],
        { format: 'jpeg', compress: 0.3 }
      );
      this.setState({
        selectImageThroughImagePicker: true
      }, () => {
        this.setState({
          upload: resultEdited,
          avatarURL: resultEdited.uri
        }, () => {
            this.validForm();
        });
      });
    }
  }

  addSelectedCategory() {
    const { categories, selectedCategory } = this.state;

    if (categories.indexOf(selectedCategory) > 0) {
      return;
    }

    const newCategories = [...categories];
    newCategories.push(selectedCategory);

    this.setState({ categories: newCategories }, () => {
      this.validForm();
    });

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
    this.setState({ categories: newCategories }, () => {
      this.validForm();
    });
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

        this.setState({ hours: newHours }, () => {
          console.log(this.state.hours);
          this.validForm();
        });
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

      this.setState({ hours: newHours }, () => {
        console.log(this.state.hours);
        this.validForm();
      });
    }

    this.checkIntervalHours(newHours, openTimeHour, closeTimeHour);
  }

  removeHoursOfOperationAtIndex(index) {
    const { hours } = this.state;
    const newHours = [...hours];
    newHours.splice(index, 1);
    this.setState({ hours: newHours }, () => {
      console.log(this.state.hours);
      this.validForm();
    });
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

    const avatarURL = await this.props
      .uploadImage(uri, 10, 'image/jpeg', fileName, 'userAvatar', 'public-read');

    console.log('Got Avatar URL: ', avatarURL);
    this.setState({
      selectImageThroughImagePicker: false
    }, () => {
      this.setState({
        avatarURL,
        upload: null
      });
    });
  }

  async save() {
    if(disableBtn === false) {
      disableBtn = true;

      const { vendor, isBusy, createVendor, updateVendor } = this.props;

      if (isBusy) {
        console.log('is busy');
        return;
      }

      try {
        await this.uploadPhoto();

        const params = { ...this.state };
        params.pricing += 1;

        delete params.upload;

        if (vendor) {
          console.log('updating vendor');
          await updateVendor(vendor.get('_id'), params);
        } else {
          console.log('create vendor');
          await createVendor(params);
        }
        this.props.navigation.goBack();

        disableBtn = false;

        // PATCH: don't navigate back on success
        //        makes it easier to debug
        // TODO: uncomment line under this
        // this.props.navigateBack();
        // END PATCH
      } catch (e) {
        if(e.code === 401) {
          manuallyLogout(e, () => this.props.userLogout());
          disableBtn = false;
        } else {
          showAlertWithMessage('Uh-oh!', e, () => {
            disableBtn = false;
          });
        }
      }
    }
  }

  navigateToMapView() {
    this.props.navigate({
      routeName: 'LocationSearch',
      params: {
        onSelect: location => {
          console.log('got location', location);
          this.setState({ location }, () => {
            this.validForm();
          });
        },
        onError: () => {
          console.log('error getting location');
        }
      }
    });
  }

  toggle(name) {
    if (this.state.filters.length === 0) {
      this.state.filters.push(name);
    } else if (this.state.filters.findIndex(x => x === name) !== -1) {
      this.state.filters.splice(
        this.state.filters.findIndex(x => x === name),
        1
      );
    } else {
      this.state.filters.push(name);
    }

    this.setState(() => {
      return {
        filters: this.state.filters
      }
    }, () => console.log(this.state.filters));
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
      email,
      selectImageThroughImagePicker
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
      <KeyboardAvoidingView style={[styles.container, { flex: 1 }]} behavior='padding'>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.avatarWrap}
              onPress={() => this.showAvatarActionSheet()}
            >
              <View style={styles.imageHolder}>
                <CacheImage
                  style={styles.avatar}
                  source={
                    avatarURL
                      ? avatarURL
                      : require('../../../../assets/images/etc/default-avatar.png')
                  }
                />
              </View>
              <CacheImage
                style={styles.editAvatarIcon}
                type='image'
                source={require('../../../../assets/images/etc/EditIcon.png')}
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
                <Text style={[styles.editText, { paddingTop: wp('2.13%') }]}>Edit Info</Text>
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
                onChange={val => {
                  this.setState({ name: val }, () => {
                    this.validForm();
                  });
                }}
                placeholder=""
                showInputBottomBorder={false}
                type="name"
                value={name}
              />
              <ProfileTextInput
                label="Web Address"
                onChange={val => {
                  this.setState({ website: val }, () => {
                    this.validForm();
                  });
                }}
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
                <Text style={styles.editBtnText}>Edit</Text>
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
            <View style={[styles.sectionBody, styles.extra4Padding]}>
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

              <View style={[styles.pickerContainer, {flexDirection: 'row'}]}>
                <Picker
                  mode="dropdown"
                  iosHeader="Select a day"
                  iosIcon={
                    <Feather
                      name="chevron-down"
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
                    <Feather
                      name="chevron-down"
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
                    <Feather
                      name="chevron-down"
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
            <View style={[styles.sectionBody, styles.extra4Padding]}>
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
                          <Feather
                            name="chevron-down"
                            style={stylesRaw.pickerIcon}
                          />
                        }
                        style={[styles.hoursPicker, { width: '100%' }]}
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
                        style={{ justifyContent: 'center' }}
                      >
                        <Text style={[styles.addText, { textAlign: 'right' }]}>Add Category</Text>
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
            <Text style={[styles.sectionSubHeaderText, styles.extra4Padding]}>
              Select the options your location offers
            </Text>

            <View style={styles.filtersHolder}>
              <View style={styles.commonFilterPanel}>
                <FilterItem
                  name="Open Now"
                  image={require('../../../../assets/images/filters/realtime-protection.png')}
                  style={{ marginBottom: 8 }}
                  toggleFilter={() => this.toggle('openNow')}
                  on={this.state.filters.find(x => x === "openNow") ? true : false}
                />

                <FilterItem
                  name="Price"
                  image={require('../../../../assets/images/filters/dollar-sign-icon.png')}
                  style={{ marginBottom: 8 }}
                  toggleFilter={() => this.toggle('price')}
                  on={this.state.filters.find(x => x === "price") ? true : false}
                />

                <FilterItem
                  name="Wifi"
                  image={require('../../../../assets/images/filters/wifi-icon.png')}
                  style={{ marginBottom: 8 }}
                  toggleFilter={() => this.toggle('wifi')}
                  on={this.state.filters.find(x => x === "wifi") ? true : false}
                />
              </View>

              <View style={styles.slidersHolder}>
                {this.state.filters.map(item => {
                  if (item === "price") {
                    return (
                      <View
                        style={styles.priceSliderContainer}
                        key={item}
                      >
                        <View
                          style={styles.priceSliderHolder}
                        >
                          <Slider
                            minimumValue={0}
                            maximumValue={3}
                            step={1}
                            minimumTrackTintColor="rgb(47,212,117)"
                            maximumTrackTintColor="rgb(230,230,230)"
                            thumbTintColor="rgb(255,254,255)"
                            thumbStyle={{ height: 18, width: 18 }}
                            style={{height: 31}}
                            value={this.state.pricing}
                            onSlidingComplete={value =>
                              this.setState({ pricing: value })
                            }
                            trackStyle={{ height: 3 }}
                            thumbStyle={{ height: 13, width: 13 }}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            height: 31,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            zIndex: 1
                          }}
                        >
                          <Text
                            style={{
                              color: COLOR_GREEN,
                              fontSize: wp('2.66%'),
                              width: wp('13.33%'),
                              height: 20,
                              fontFamily: SF_PRO_DISPLAY_REGULAR
                            }}
                          >
                            $
                          </Text>

                          <View
                            style={[
                              styles.priceBarIndicator,
                              {
                                backgroundColor:
                                  this.state.pricing > 0.0
                                    ? 'rgba(255,255,255,1.0)'
                                    : null
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            left: price2Indicator,
                            position: 'absolute',
                            height: 31,
                            flexDirection: 'column',
                            zIndex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            style={[
                              {
                                fontSize: wp('2.66%'),
                                height: 20,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.state.pricing >= 1
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
                                  this.state.pricing === 1
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            position: 'absolute',
                            left: price3Indicator,
                            height: 31,
                            flexDirection: 'column',
                            zIndex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            style={[
                              {
                                fontSize: wp('2.66%'),
                                height: 20,
                                marginLeft: 2,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.state.pricing >= 2
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
                                  this.state.pricing === 2
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            height: 31,
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
                                fontSize: wp('2.66%'),
                                height: 20,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.state.pricing >= 3
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
                                  this.state.pricing >= 3
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>
                      </View>
                    );
                  }
                })}
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
              style={{ marginVertical: wp('5.33%') }}
              onChange={val => this.setState({ email: val })}
              placeholder=""
              keyboardType="email-address"
              type="name"
              borderBottomWidth={1}
              borderBottomColor="rgba(255,255,255,0.53)"
              value={email}
            />
          </View>
          <View style={styles.footerSection}>
            <Button
              style={[submitBtnVendor.styles, {
                borderColor: !this.state.isFormValid ? 'grey' : 'rgb(15,209,74)'
              }]}
              disabled={!this.state.isFormValid}
              textStyle={submitBtnVendor.textStyles}
              onPress={() => this.save()}
            >
              Submit Vendor
            </Button>
          </View>
        </ScrollView>
        <View style={styles.bottomSeparator} />
        <LoadingComponent visible={isBusy} />
      </KeyboardAvoidingView>
    );
  }
}

const buttonStyles = {
  saveBtn: {
    backgroundColor: 'transparent',
    width: wp('14.66%'),
    height: wp('10.13%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderColor: 'transparent'
  },
  saveBtnText: {
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: FONT_FAMILY,
    fontSize: wp('4.5%')
  }
};

const submitBtnVendor = {
  styles: {
    width: wp('53.33%'),
    height: wp('9.6%'),
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  textStyles: {
    color: 'white',
    fontFamily: SF_PRO_TEXT_BOLD,
    fontSize: wp('3.46%'),
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center'
  }
};
