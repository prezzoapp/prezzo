// @flow
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native';
import { ActionSheet } from 'native-base';
import { ImagePicker, Permissions, ImageManipulator, FileSystem } from 'expo';
import PropTypes from 'prop-types';
import shorthash from 'shorthash';
import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import ProfileDataField from '../../../components/ProfileDataField';
import ProfileTextInput from '../../../components/ProfileTextInput';
import { getTimeStampString } from '../../../services/commonFunctions';
import CacheImage from '../../../components/CacheImage';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_WHITE
} from '../../../services/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
let previousPhoto = null;

type State = {
  avatarURL: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  zip: string,
  city: string
};

class EditProfile extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('70%'),
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        My Information
      </Text>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('8%')}
        />
      </TouchableOpacity>
    )
  });

  static displayName = 'Edit Profile';

  constructor(props) {
    super(props);
    const { address, avatarURL, city, firstName, lastName, phone, zip } = props;

    this.state = {
      isEditing: false,
      address,
      avatarURL,
      city,
      firstName,
      lastName,
      phone,
      upload: null,
      zip,
      selectImageThroughImagePicker: false
    };
  }

  // deletePreviousImage = async () => {
  //   if(previousPhoto) {
  //     const name = shorthash.unique(previousPhoto);
  //     const path = `${FileSystem.cacheDirectory}${name}.jpeg`;
  //     const image = await FileSystem.getInfoAsync(path);
  //
  //     if(image.exists) {
  //       await FileSystem.deleteAsync(image.uri);
  //       console.log('Image deleted from cache!');
  //     }
  //   }
  // };

  async save() {
    const { isBusy, updateUser } = this.props;

    if (isBusy) {
      console.log('is busy');
      return;
    }

    try {
      await this.uploadPhoto();
      // await this.deletePreviousImage(previousPhoto);
    } catch (e) {
      console.warn('error uploading image', e);
    }

    const {
      avatarURL,
      firstName,
      lastName,
      phone,
      address,
      zip,
      city
    } = this.state;

    updateUser(avatarURL, firstName, lastName, phone, address, zip, city)
      .then(() => this.setState({ isEditing: false }))
      .catch(e => console.log(e))
      .finally(() => this.setState({ isEditing: false }));
  }

  toggleEditing() {
    if (this.state.isEditing) {
      this.save();
    } else {
      this.setState({ isEditing: true });
    }
  }

  async uploadPhoto() {
    // previousPhoto = this.props.avatarURL;
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
        selectImageThroughImagePicker: false
      }, () => {
        this.setState({
          avatarURL,
          upload: null
        });
      });
    });
  }

  showAvatarActionSheet() {
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
      this.openCamera()
    }
  }

  openImageGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3
    });
    if (!result.cancelled) {
      const resultEdited = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 150 }}],
        { format: 'jpeg', compress: 0.3 }
      );
      this.setState({
        selectImageThroughImagePicker: true
      }, () => {
        this.setState({ upload: resultEdited, avatarURL: resultEdited.uri }, () => {
          this.save();
        });
      })
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3
    });
    if (!result.cancelled) {
      const resultEdited = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 150 }}],
        { format: 'jpeg', compress: 0.3 }
      );
      this.setState({
        selectImageThroughImagePicker: true
      }, () => {
        this.setState({ upload: resultEdited, avatarURL: resultEdited.uri }, () => {
          this.save();
        });
      })
    }
  };

  render() {
    const {
      avatarURL,
      firstName,
      lastName,
      phone,
      address,
      zip,
      city,
      selectImageThroughImagePicker
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.parent}
        behavior='padding'>
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <View style={styles.headerContainer}>
              {(() => {
                if (1) {
                  return (
                    <TouchableOpacity
                     style= {{position: 'relative'}}
                      onPress={() => this.showAvatarActionSheet()}
                    >
                      <View style={styles.imageHolder}>
                        <CacheImage
                          style={styles.avatar}
                          type='image'
                          selectImageThroughImagePicker={selectImageThroughImagePicker}
                          source={
                            avatarURL
                            ? avatarURL
                            : require('../../../../assets/images/etc/default-avatar.png')}
                        />
                      </View>

                      <CacheImage
                        type='image'
                        style={styles.editBtnImage}
                        source={
                         require('../../../../assets/images/etc/EditIcon.png')
                        }
                      />

                    </TouchableOpacity>
                  );
                }

              })()}
            </View>
            <View style={styles.bodyContainer}>
              {(() => {
                if (this.state.isEditing) {
                  return (
                    <View>
                      <ProfileTextInput
                        type="name"
                        label="First Name"
                        placeholder="John"
                        onChange={firstName => this.setState({ firstName })}
                        value={firstName}
                        extraStyle={{ paddingRight: wp('13.33%') }}
                      />

                      <ProfileTextInput
                        type="name"
                        label="Last Name"
                        placeholder="Doe"
                        onChange={lastName => this.setState({ lastName })}
                        value={lastName}
                      />
                      <ProfileTextInput
                        type="number"
                        label="Phone"
                        placeholder="(123) 456-7890"
                        onChange={phone => this.setState({ phone })}
                        value={phone}
                      />
                      <ProfileTextInput
                        type="name"
                        label="Address"
                        placeholder="123 Main St"
                        onChange={address => this.setState({ address })}
                        value={address}
                      />
                      <ProfileTextInput
                        type="number"
                        label="Zip"
                        placeholder="12345"
                        onChange={zip => this.setState({ zip })}
                        value={zip}
                      />
                      <ProfileTextInput
                        type="name"
                        label="City"
                        placeholder="New York"
                        onChange={city => this.setState({ city })}
                        value={city}
                      />
                    </View>
                  );
                }
                return (
                  <View>
                    <ProfileDataField
                      label="First Name"
                      value={this.props.firstName}
                      extraStyle={{ paddingRight: wp('13.33%') }}
                    />

                    <ProfileDataField
                      label="Last Name"
                      value={this.props.lastName}
                    />
                    <ProfileDataField label="Phone" value={this.props.phone} />
                    <ProfileDataField
                      label="Address"
                      value={this.props.address}
                    />
                    <ProfileDataField label="Zip" value={this.props.zip} />
                    <ProfileDataField label="City" value={this.props.city} />
                  </View>
                );
              })()}
              <TouchableOpacity style={styles.toggleBtn} onPress={() => this.toggleEditing()}>
                <View>
                  <Text style={styles.edit}>
                    {this.state.isEditing ? 'Save' : 'Edit'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingTop: hp('3.20%'),
    paddingHorizontal: wp('8.26%'),
    paddingBottom: hp('5%')
  },
  avatar: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  imageHolder: {
    height: wp('27.2%'),
    width: wp('27.2%'),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: wp('13.5%'),
    overflow: 'hidden'
  },
  bodyContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    position: 'relative'
  },
  edit: {
    color: COLOR_GREEN,
    fontSize: wp('4.8%'),
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY),
    lineHeight: wp('5.86%')
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: hp('4.67%')
  },
  parent: {
    backgroundColor: COLOR_BLACK,
    flex: 1
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  },
  toggleBtn: {
    position: 'absolute',
    right: 0,
    top: hp('0.6%')
  },
  editBtnImage: {
    width: wp('7.46%'),
    height: wp('7.46%'),
    position: 'absolute',
    right: 5,
    top: 0
  }
});

EditProfile.propTypes = {
  address: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default EditProfile;
