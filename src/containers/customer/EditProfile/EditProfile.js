// @flow
import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import ProfileDataField from '../../../components/ProfileDataField';
import ProfileTextInput from '../../../components/ProfileTextInput';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_BLACK,
  COLOR_GREEN
} from '../../../services/constants';

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
  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: props => (
      <Icon name="person-outline" size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerTitleStyle: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: 18
    },
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    }
  };

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
    const { fileName, fileSize, uri } = upload;

    await this.props.uploadImage(
        uri,
        fileSize,
        'image/jpeg',
        fileName,
        'userAvatar',
        'public-read'
      )
      .then(async avatarURL => {
      console.log('got avatarURL', avatarURL);

      this.setState({
          avatarURL,
          upload: null
      });
    });
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
        console.log('Image URI: ', response.uri);
        this.setState({
          avatarURL: response.uri,
          upload: response
        });
      }
    });
  }

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
      <KeyboardAvoidingView behavior="padding" style={styles.parent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                {(() => {
                  if(this.state.isEditing) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.showAvatarActionSheet()}
                      >
                        <Image style={styles.avatar}
                          source={
                            avatarURL
                            ? { uri: avatarURL }
                            : require('../../../../assets/images/etc/default-avatar.png')}
                        />
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <Image style={styles.avatar}
                      source={
                        avatarURL
                        ? { uri: avatarURL }
                        : require('../../../../assets/images/etc/default-avatar.png')}
                    />
                  );
                })()}
              </View>
              <TouchableOpacity onPress={() => this.toggleEditing()}>
                <View>
                  <Text style={styles.edit}>
                    {this.state.isEditing ? 'Save' : 'Edit'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {(() => {
              if(this.state.isEditing) {
                return (
                  <View style={styles.bodyContainer}>
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
                  </View>
                );
              }
              return (
                <View style={styles.bodyContainer}>
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
                </View>
              );
            })()}
          </View>
        </TouchableWithoutFeedback>
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
    alignItems: 'center',
    flex: 2,
    flexDirection: 'column',
    marginTop: 28
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 31,
    marginTop: 90
  },
  edit: {
    color: COLOR_GREEN,
    fontSize: 18,
    fontFamily: FONT_FAMILY
  },
  editAvatar: {
    height: 28
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
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
