// @flow
import React from 'react';
import { ImageBackground, Text, Image, StyleSheet, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { FONT_FAMILY, FONT_FAMILY_REGULAR, SF_PRO_DISPLAY_BOLD, SF_PRO_DISPLAY_ULTRALIGHT, SF_PRO_TEXT_SEMI_BOLD } from '../../../services/constants';
import Button from '../../../components/Button';

type Props = {
  navigate: PropTypes.func.isRequired
};

const containerPaddingLeftRight: number = wp('10.66%');
const containerPaddingTopBottom: number = hp('9.85%');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: containerPaddingLeftRight,
    paddingRight: containerPaddingLeftRight,
    paddingTop: containerPaddingTopBottom,
    paddingBottom: containerPaddingTopBottom
  },
  image: {
    aspectRatio: 0.8,
    // marginTop: hp('17.85%'),
    // marginTop: wp('38.4%'),
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  headerText: {
    fontSize: wp('8.37%'),
    fontFamily: SF_PRO_DISPLAY_BOLD,
    textAlign: 'center',
    color: '#fff',
    // marginBottom: wp('2.13%'),
    marginTop: wp('5%'),
    marginBottom: wp('18.66%'),
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontSize: wp('8%'),
    fontFamily: SF_PRO_DISPLAY_ULTRALIGHT,
    textAlign: 'center',
    color: '#fff',
    marginBottom: wp('37.33%'),
    backgroundColor: 'transparent'
  },
  navigation: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0
  }
});

const buttonStyles = {
  explore: {
    width: wp('42.66%'),
    height: wp('14.4%'),
    justifyContent: 'center',
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  },

  exploreText: {
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    fontSize: wp('5.33%'),
    paddingTop: 0,
    paddingBottom: 0
  }
};

class SignupComplete extends React.Component<Props> {
  static navigationOptions = {
    header: null
    // headerStyle: {
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   left: 0,
    //   backgroundColor: 'transparent',
    //   borderBottomColor: 'transparent',
    //   elevation: 0
    // },
    // headerTintColor: '#fff',
    // headerLeft: null
  };

  navigateToHome() {
    this.props.navigate({ routeName: 'Customer' });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.jpg')}
      >
        <Image
          style={styles.image}
          source={require('../../../../assets/images/etc/chef.png')}
        />

        <Text style={styles.headerText}>You're all set!</Text>

        {/*<Text style={styles.bodyText}>
          Thanks for helping us keep your account secure.
        </Text>*/}

        <Button
          style={buttonStyles.explore}
          textStyle={buttonStyles.exploreText}
          onPress={() => this.navigateToHome()}
        >
          Explore
        </Button>
      </ImageBackground>
    );
  }
}

export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(SignupComplete);
