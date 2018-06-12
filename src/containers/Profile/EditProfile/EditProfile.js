// @flow
import React, {Component} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileDataField from '../../../components/ProfileDataField';
import ProfileTextInput from '../../../components/ProfileTextInput';
import {FONT_FAMILY, FONT_FAMILY_MEDIUM} from '../../../services/constants';

const prezzoBlack = '#2B2C2C';

type Props = {
  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
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
      // TODO: Attempt to save all data to server for user and return new user object
    } else {
      this.setState({isEditing: true});
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.parent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={require('../../../../assets/images/etc/default-avatar.png')}/>
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
                  />
                  <ProfileTextInput
                    type='name'
                    label='Last Name'
                    placeholder='Tamrin'
                  />
                  <ProfileTextInput
                    type='number'
                    label='Phone'
                    placeholder='(477) 722-2796'
                  />
                  <ProfileTextInput
                    type='name'
                    label='Address'
                    placeholder='215 Sage Alley'
                  />
                  <ProfileTextInput
                    type='number'
                    label='Zip'
                    placeholder='12796'
                  />
                  <ProfileTextInput
                    type='name'
                    label='City'
                    placeholder='New York'
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
    color: '#39B86C',
    fontSize: 18,
    fontFamily: FONT_FAMILY
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

export default EditProfile;
