// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, StyleSheet} from 'react-native';
import Permissions from 'react-native-permissions';
import {FONT_FAMILY, FONT_FAMILY_MEDIUM, FONT_FAMILY_BOLD} from '../../services/constants';
import Button from '../../components/Button';

type Props = {};

type State = {
  notificationPermission: 'authorized' | 'denied' | 'restricted' | 'undetermined'
};

class EnableNotificationsView extends React.Component<Props, State> {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: null
  };

  state = {
    notificationPermission: 'undetermined'
  };

  componentDidMount() {
    Permissions.check('notification').then(response => {
      console.log('setting notificationPermission', response);
      // Response is one of: 'authorized', 'denied',
      // 'restricted', or 'undetermined'
      this.setState({notificationPermission: response});
    });
  }

  requestPermission = () => {
    Permissions.request('notification').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({notificationPermission: response});
    });
  }

  navigateToTutorial() {
    this.props.navigate({routeName: 'Home'});
  }

  navigateToSignup() {
    this.props.navigate({routeName: 'Signup'});
  }

  render() {
    const doesHavePermission = this.state.notificationPermission === 'authorized';
    const notifyButtonStyle = {
      ...buttonStyles.notify
    };

    if (doesHavePermission) {
      notifyButtonStyle.backgroundColor = '#d3d3d3';
      notifyButtonStyle.borderColor = '#d3d3d3';
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.chatIcon}
          source={require('../../../assets/images/icons/chat.png')}
        />
        <Text style={styles.headerText}>
          Turn on notifications?
        </Text>
        <Text style={styles.regularText}>
          We can let you know when someone messages you, or notify you about
          other important account activity.
        </Text>
        <Button
          style={notifyButtonStyle}
          textStyle={buttonStyles.notifyText}
          disabled={doesHavePermission}
          onPress={() => this.requestPermission()}
        >
          Yes, Notify Me
        </Button>
        <Button
          style={buttonStyles.skip}
          textStyle={buttonStyles.skipText}
          onPress={() => this.navigateToSignup()}
        >
          Skip
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff'
  },
  chatIcon: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  headerText: {
    fontSize: 30,
    fontFamily: FONT_FAMILY_BOLD,
    color: '#484848',
    marginBottom: 20
  },
  regularText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    color: '#484848',
    marginBottom: 40
  }
});

const buttonStyles = {
  notify: {
    width: '50%',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 20,
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },
  notifyText: {
    fontFamily: FONT_FAMILY_MEDIUM
  },
  skip: {
    width: '30%',
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#fff',
    borderColor: '#0DD24A'
  },
  skipText: {
    color: '#0DD24A',
    fontFamily: FONT_FAMILY_MEDIUM
  }
};

export default EnableNotificationsView;
