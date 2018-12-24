// @flow
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActionSheetIOS,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import ProfileDataField from '../../../components/ProfileDataField';
import ProfileTextInput from '../../../components/ProfileTextInput';
import { getTimeStampString } from '../../../services/commonFunctions';
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
          width: wp('50%'),
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
      borderBottomWidth: 0
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
      zip
    };
  }

  async save() {
    const { isBusy, updateUser } = this.props;

    if (isBusy) {
      console.log('is busy');
      return;
    }

    try {
      await this.uploadPhoto();
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

  showAvatarActionSheet() {
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
      this.openCamera()
    }
  }

  openImageGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3
    });
    if (!result.cancelled) {
      this.setState({ upload: result, avatarURL: result.uri });
      this.save();
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.3
    });

    if (!result.cancelled) {
      this.setState({ upload: result, avatarURL: result.uri });
      this.save();

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
      city
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.parent}
        behavior='padding'>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 31, paddingBottom: hp('9%') }}>
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                {(() => {
                  if (1) {
                    return (
                      <TouchableOpacity
                       style= {{position: 'relative'}}
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
                          style={{width: 34, height: 34, position: 'absolute', right:0}}
                          source={
                           require('../../../../assets/images/etc/EditIcon.png')
                          }
                        />

                      </TouchableOpacity>
                    );
                  }

                })()}
              </View>
            </View>
            {(() => {
              if (this.state.isEditing) {
                return (
                  <View style={[styles.bodyContainer,{position: 'relative'}]}>
                    <ProfileTextInput
                      type="name"
                      label="First Name"
                      placeholder="John"
                      onChange={firstName => this.setState({ firstName })}
                      value={firstName}
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
                    <TouchableOpacity style={{position: 'absolute', right: 0, top: 5}} onPress={() => this.toggleEditing()}>
                      <View>
                        <Text style={styles.edit}>
                          {this.state.isEditing ? 'Save' : 'Edit'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
              return (
                <View style={[styles.bodyContainer,{position: 'relative'}]}>
                  <ProfileDataField
                    label="First Name"
                    value={this.props.firstName}
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

                  <TouchableOpacity style={{position: 'absolute', right: 0, top: 5}} onPress={() => this.toggleEditing()}>
                      <View>
                      <Text style={styles.edit}>
                      {this.state.isEditing ? 'Save' : 'Edit'}
                      </Text>
                      </View>
                  </TouchableOpacity>
                </View>
              );
            })()}
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'cover',
    width: 102
  },
  avatarContainer: {
    alignItems: 'center',
    flex: 0.68,
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  edit: {
    color: COLOR_GREEN,
    fontSize: 18,
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY)
  },
  editAvatar: {
    height: 28
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: hp('3.20%'),
    marginBottom: hp('3.44%')
  },
  parent: {
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
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
