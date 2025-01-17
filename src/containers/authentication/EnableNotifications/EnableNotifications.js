// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet, InteractionManager } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Permissions } from 'expo';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_BOLD
} from '../../../services/constants';
import Button from '../../../components/Button';
import CacheImage from '../../../components/CacheImage';

type Props = {};

type State = {
  notificationPermission: 'granted' | 'denied' | 'restricted' | 'undetermined'
};

let disableBtn = false;

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

  checkNotificationPermission = async () => {
    const getResult = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if(getResult.status !== 'granted') {
      const askResult = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if(askResult.status === 'granted') {
        this.navigateToSignup();
      }
      this.setState({
        notificationPermission: askResult.status
      });
    } else if(getResult.status === 'granted') {
      this.setState({
        notificationPermission: getResult.status
      }, () => {
        this.navigateToSignup();
      });
    }
  };

  navigateToSignup = () => {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({ routeName: 'SignupName' });
      this.enableBtns();
    }
  };

  enableBtns() {
    InteractionManager.runAfterInteractions(() => {
      disableBtn = false;
    });
  }

  render() {
    const doesHavePermission = this.state.notificationPermission === 'granted';
    const notifyButtonStyle = {
      ...buttonStyles.notify
    };

    if (doesHavePermission) {
      notifyButtonStyle.backgroundColor = '#d3d3d3';
      notifyButtonStyle.borderColor = '#d3d3d3';
    }

    return (
      <View style={styles.container}>
        <CacheImage
          style={styles.chatIcon}
          type='image'
          source={require('../../../../assets/images/icons/chat.png')}
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
          onPress={this.checkNotificationPermission}
        >
          Yes, Notify Me
        </Button>
        <Button
          style={buttonStyles.skip}
          textStyle={buttonStyles.skipText}
          onPress={this.navigateToSignup}
        >
          Skip
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5.6%'),
    paddingTop: wp('19.5%'),
    backgroundColor: '#fff'
  },
  chatIcon: {
    width: wp('13.33%'),
    height: wp('10.3%'),
    marginBottom: wp('9.53%'),
    resizeMode: 'contain'
  },
  headerText: {
    fontSize: wp('8.5%'),
    fontFamily: FONT_FAMILY_BOLD,
    color: '#484848',
    marginBottom: wp('4%'),
    lineHeight: wp('9%')
  },
  regularText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY,
    color: '#484848',
    marginBottom: wp('13.33%'),
    lineHeight: wp('6.93%')
  }
});

const buttonStyles = {
  notify: {
    height: wp('13.33%'),
    width: wp('46.66%'),
    marginLeft: 0,
    marginRight: 0,
    marginBottom: wp('4.26%'),
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A',
    justifyContent: 'center'
  },
  notifyText: {
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: wp('4.8%')
  },
  skip: {
    width: wp('26.66%'),
    height: wp('13.33%'),
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#fff',
    borderColor: '#0DD24A',
    justifyContent: 'center'
  },
  skipText: {
    color: '#0DD24A',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: wp('4.8%')
  }
};

export default EnableNotificationsView;
