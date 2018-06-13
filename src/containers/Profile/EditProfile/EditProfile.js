// @flow
import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {
  updateAvatarURL,
  updateFirstName,
  updateLastName,
  updatePhone,
  updateAddress,
  updateZip,
  updateCity,
  updateProfile
} from '../../modules/signup';
import ProfileDataField from '../../../components/ProfileDataField';
import ProfileTextInput from '../../../components/ProfileTextInput';
import {FONT_FAMILY, FONT_FAMILY_MEDIUM} from '../../../services/constants';

const prezzoBlack = '#2B2C2C';
const prezzoGreen = '#39B86C';

type Props = {
  avatarURL: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  zip: string,
  city: string,
  updateavatarURL: Function,
  updateFirstName: Function,
  updateLastName: Function,
  updatePhone: Function,
  updateAddress: Function,
  updateZip: Function,
  updateCity: Function,
  updateProfile: Function
};

type State = {
  firstName: string,
  lastName: string
};

class EditProfile extends Component<Props, State> {
  static displayName = 'Edit Profile';

  static navigationOptions = {
    title: 'My Information',
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
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
      right: 0
    }
  };

  state = {
    isEditing: false
  };

  toggleEditing() {
    if (this.state.isEditing) {
      // Save all data to server for user and return new user object
      this.setState({isBusy: true});

      const {avatarURL, firstName, lastName, phone, address, zip, city} = this.props;
      this.props.updateProfile(avatarURL, firstName, lastName, phone, address, zip, city)
        .then(() => this.navigateToUserProfile())
        .catch(() => console.log('Something went wrong'))
        .finally(() => this.setState({isBusy: false}));
    } else {
      this.setState({isEditing: true});
    }
  }

  navigateToUserProfile() {
    this.props.navigation.goBack(null);
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
        this.props.updateAvatarURL(response.uri);
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.parent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                {this.state.isEditing
                  ? <TouchableOpacity onPress={() => this.showAvatarActionSheet()}>
                      <Image style={styles.avatar} source={require('../../../../assets/images/etc/default-avatar.png')} />
                    </TouchableOpacity>
                  : <Image style={styles.avatar} source={require('../../../../assets/images/etc/default-avatar.png')} />
                }
              </View>
              <TouchableOpacity onPress={() => this.toggleEditing()}>
                <View>
                  <Text style={styles.edit}>{this.state.isEditing ? 'Save' : 'Edit'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.state.isEditing
              ? <View style={styles.bodyContainer}>
                  <ProfileTextInput
                    type='name'
                    label='First Name'
                    placeholder='Andreas'
                    onChange={value => this.props.updateFirstName(value)}
                  />
                  <ProfileTextInput
                    type='name'
                    label='Last Name'
                    placeholder='Tamrin'
                    onChange={value => this.props.updateLastName(value)}
                  />
                  <ProfileTextInput
                    type='number'
                    label='Phone'
                    placeholder='(477) 722-2796'
                    onChange={value => this.props.updatePhone(value)}
                  />
                  <ProfileTextInput
                    type='name'
                    label='Address'
                    placeholder='215 Sage Alley'
                    onChange={value => this.props.updateAddress(value)}
                  />
                  <ProfileTextInput
                    type='number'
                    label='Zip'
                    placeholder='12796'
                    onChange={value => this.props.updateZip(value)}
                  />
                  <ProfileTextInput
                    type='name'
                    label='City'
                    placeholder='New York'
                    onChange={value => this.props.updateCity(value)}
                  />
                </View>
              : <View style={styles.bodyContainer}>
                  <ProfileDataField label='First Name' value='Andreas' />
                  <ProfileDataField label='Last Name' value='Tamrin' />
                  <ProfileDataField label='Phone' value='(477) 722-2796' />
                  <ProfileDataField label='Address' value='215 Sage Alley' />
                  <ProfileDataField label='Zip' value='12796' />
                  <ProfileDataField label='City' value='New York' />
                </View>
              }
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
    resizeMode: 'contain',
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
    color: prezzoGreen,
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
    backgroundColor: prezzoBlack,
    flex: 1,
    justifyContent: 'center'
  }
});

export default connect(state => ({
  avatarURL: state.get('profile').get('avatarURL'),
  firstName: state.get('profile').get('firstName'),
  lastName: state.get('profile').get('lastName'),
  phone: state.get('profile').get('phone'),
  address: state.get('profile').get('address'),
  zip: state.get('profile').get('zip'),
  city: state.get('profile').get('city')
}), dispatch => {
  return {
    updateAvatarURL: bindActionCreators(updateAvatarURL, dispatch),
    updateFirstName: bindActionCreators(updateFirstName, dispatch),
    updateLastName: bindActionCreators(updateLastName, dispatch),
    updatePhone: bindActionCreators(updatePhone, dispatch),
    updateAddress: bindActionCreators(updateAddress, dispatch),
    updateZip: bindActionCreators(updateZip, dispatch),
    updateCity: bindActionCreators(updateCity, dispatch),
    updateProfile: bindActionCreators(updateProfile, dispatch)
  };
})(EditProfile);
