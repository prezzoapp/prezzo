// @flow
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import * as snapshot from '../../utils/snapshot';

class Profile extends Component {
  static displayName = 'Profile';

  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: props => (
      <Icon name='person-outline' size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    }
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  async logout() {
    await snapshot.clearSnapshot();
    this.props.navigate({routeName: 'Unauthenticated'});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            style={buttonStyles.logout}
            textStyle={buttonStyles.logoutText}
            onPress={() => this.logout()}
          >
            Logout
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },
  buttonContainer: {
    width: '50%'
  }
});

const buttonStyles = {
  logout: {
    backgroundColor: 'transparent',
    borderColor: '#0DD24A'
  },
  logoutText: {
    color: '#0DD24A'
  }
};

export default Profile;
