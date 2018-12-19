// @flow
import React from 'react';
import { ImageBackground, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { FONT_FAMILY, FONT_FAMILY_REGULAR } from '../../../services/constants';
import Button from '../../../components/Button';

type Props = {
  navigate: PropTypes.func.isRequired
};

const containerPaddingLeftRight: number = 40;
const containerPaddingTopBottom: number = 80;

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
    marginTop: 80,
    marginBottom: 26,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  headerText: {
    fontSize: wp('9.6%'),
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
    color: '#fff',
    marginBottom: hp('0.98%'),
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontSize: wp('8%'),
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
    color: '#fff',
    marginBottom: hp('17.24%'),
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
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A'
  }
};

class SignupComplete extends React.Component<Props> {
  static navigationOptions = {
    headerStyle: styles.navigation,
    headerTintColor: '#fff',
    headerLeft: null
  };

  navigateToHome() {
    this.props.navigate({routeName: 'Customer'});
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../../../assets/images/bg/authentication.png')}
      >
        <Image
          style={styles.image}
          source={require('../../../../assets/images/etc/chef.png')}
        />

        <Text style={styles.headerText}>You're all set!</Text>

        <Text style={styles.bodyText}>
          Thanks for helping us keep your account secure.
        </Text>

        <Button
          style={buttonStyles.explore}
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
