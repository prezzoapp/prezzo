// @flow
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ActionSheet } from 'native-base';
import { ImagePicker, Permissions, ImageManipulator, FileSystem } from 'expo';
import MenuButton from '../../../components/MenuButton';
import * as snapshot from '../../../utils/snapshot';
import { getTimeStampString } from '../../../services/commonFunctions';
import LoadingComponent from '../../../components/LoadingComponent';
import CacheImage from '../../../components/CacheImage';
import {
  FONT_FAMILY,
  COLOR_BLACK,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';
import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';

let disableBtn = false;

class Profile extends Component {
  static navigationOptions = {
    headerTitle: (
      <Text
        style={{
          flex: 1,
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}>My Profile
      </Text>
    ),
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTintColor: '#fff'
  };

  static displayName = 'Profile';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    avatarURL: PropTypes.string.isRequired,
    userLogout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { address, avatarURL, city, firstName, lastName, phone, zip } = props;

    this.state = {
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

  componentWillReceiveProps(nextProps) {
    console.log('ReceiveProps called!');
    if(nextProps.avatarURL !== this.props.avatarURL) {
      console.log('In.....');
      this.setState({
        avatarURL: nextProps.avatarURL
      });
    }
  }

  async logout() {
    if(disableBtn === false) {
      disableBtn = true;
      try {
        await this.props.userLogout(true);
        await snapshot.clearSnapshot();
        disableBtn = false;
      } catch(err) {
        if(err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err, () => {
            disableBtn = false;
          });
        }
      }
    }
  }

  navigateToEditProfile() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'EditProfile' });
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    }
  }

  navigateToPaymentMenu() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'PaymentMenu' });
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    }
  }

  async save() {
    const { isBusy, updateUser } = this.props;

    if (isBusy) {
      return;
    }

    try {
      await this.uploadPhoto();

      const {
        avatarURL,
        firstName,
        lastName,
        phone,
        address,
        zip,
        city
      } = this.state;

      await updateUser(avatarURL, firstName, lastName, phone, address, zip, city);
    } catch(err) {
      if(err.code === 401) {
        manuallyLogout(err, () => this.props.userLogout());
      } else {
        showAlertWithMessage('Uh-oh!', err);
      }
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
      selectImageThroughImagePicker
    } = this.state;

    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
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
          </View>
          <View style={styles.bodyContainer}>
            <MenuButton
              onPress={() => this.navigateToEditProfile()}
              title="My Information"
              subtitle="Edit my personal information"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => this.navigateToPaymentMenu()}
              title="Payment Methods"
              subtitle="Edit my payment methods"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => null}
              title="My History"
              icon="chevron-right"
            />
            <MenuButton
              onPress={() => this.props.navigate({ routeName: 'Vendor' })}
              title="Switch to Vendor Account"
              icon="repeat"
            />
          </View>
          <View style={styles.footerContainer}>
            {/*<TouchableOpacity onPress={() => {}}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerText}>Help</Text>
              </View>
            </TouchableOpacity>*/}
            <TouchableOpacity onPress={() => this.logout()}>
              <View style={styles.footerRight}>
                <Text style={styles.footerText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp('7.2%'),
    marginBottom: hp('1.23%')
  },
  footerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1
  },
  footerLeft: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: hp('10%')
  },
  footerRight: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: hp('10%')
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%')
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2.38%'),
    marginBottom: hp('3.44%')
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  },
  editBtnImage: {
    width: wp('7.46%'),
    height: wp('7.46%'),
    position: 'absolute',
    right: 5,
    top: 0
  }
});

Profile.propTypes = {
  navigate: PropTypes.func.isRequired,
  avatarURL: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
  logoutIsBusy: PropTypes.bool.isRequired
};

export default Profile;
