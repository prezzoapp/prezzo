// @flow
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import TutorialScreen from './TutorialScreen';
import Button from '../Button';
import FacebookButton from '../FacebookButton';
import {FONT_FAMILY} from '../../services/constants';

const images = {
  tutorial1: require('../../../assets/images/tutorial/tutorial-1.png'),
  tutorial2: require('../../../assets/images/tutorial/tutorial-2.png'),
  tutorial3: require('../../../assets/images/tutorial/tutorial-3.png'),
  tutorial4: require('../../../assets/images/tutorial/tutorial-4.png')
};

class Tutorial extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          loop={false}
          dotColor='rgba(255, 255, 255, 0.5)'
          activeDotColor='#0DD24A'
        >
          <TutorialScreen image={images.tutorial1} />
          <TutorialScreen image={images.tutorial2} />
          <TutorialScreen image={images.tutorial3} />
          <TutorialScreen image={images.tutorial4} />
        </Swiper>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.login}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <FacebookButton style={buttonStyles.facebookButton} />
          <Button style={buttonStyles.createAccountButton}>
            Create Account
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  header: {
    position: 'absolute',
    top: '5%',
    right: 0,
    width: '100%',
    height: '20%'
  },
  footer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    width: '100%',
    height: '20%'
  },
  login: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    letterSpacing: 0,
    marginRight: 20,
    color: '#fff',
    alignSelf: 'flex-end'
  }
});

const buttonStyles = {
  facebookButton: {},
  createAccountButton: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#fff'
  }
};

export default Tutorial;
