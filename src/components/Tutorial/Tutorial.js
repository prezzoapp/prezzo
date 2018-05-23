// @flow
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import TutorialScreen from './TutorialScreen';
import Button from '../Button';
import FacebookButton from '../FacebookButton';

const images = {
  tutorial1: require('../../../images/tutorial-1.png'),
  tutorial2: require('../../../images/tutorial-2.png'),
  tutorial3: require('../../../images/tutorial-3.png'),
  tutorial4: require('../../../images/tutorial-4.png')
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
              Login
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
    fontSize: 24,
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
