// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  Feather,
  FontAwesome,
  Entypo
} from '@expo/vector-icons';
import {API_ROOT} from './env';
import {setConfiguration} from './src/utils/configuration';
import { Font, Icon, Asset } from 'expo';
import 'expo';
require('react-native-browser-polyfill');

global.self = global;

const fonts = [
  MaterialIcons.font,
  EvilIcons.font,
  Ionicons.font,
  Feather.font,
  FontAwesome.font,
  Entypo.font, {
    'ClearSans-Light': require('./assets/fonts/clear-sans/ClearSans-Light.ttf'),
    'ClearSans-Medium': require('./assets/fonts/clear-sans/ClearSans-Medium.ttf'),
    'ClearSans-Bold': require('./assets/fonts/clear-sans/ClearSans-Bold.ttf'),
    'ClearSans-Regular': require('./assets/fonts/clear-sans/ClearSans-Regular.ttf'),

    'SFProDisplay-Thin': require('./assets/fonts/sfpro-display/SFProDisplay-Thin.ttf'),
    'SFProDisplay-Light': require('./assets/fonts/sfpro-display/SFProDisplay-Light.ttf'),
    'SFProDisplay-UltraLight': require('./assets/fonts/sfpro-display/SFProDisplay-UltraLight.ttf'),
    'SFProDisplay-Regular': require('./assets/fonts/sfpro-display/SFProDisplay-Regular.ttf'),
    'SFProDisplay-Medium': require('./assets/fonts/sfpro-display/SFProDisplay-Medium.ttf'),
    'SFProDisplay-Bold': require('./assets/fonts/sfpro-display/SFProDisplay-Bold.ttf'),
    'SFProDisplay-SemiBold': require('./assets/fonts/sfpro-display/SFProDisplay-Semibold.ttf'),

    'SFProText-Light': require('./assets/fonts/sfpro-text/SFProText-Light.ttf'),
    'SFProText-Regular': require('./assets/fonts/sfpro-text/SFProText-Regular.ttf'),
    'SFProText-Medium': require('./assets/fonts/sfpro-text/SFProText-Medium.ttf'),
    'SFProText-Bold': require('./assets/fonts/sfpro-text/SFProText-Bold.ttf'),
    'SFProText-SemiBold': require('./assets/fonts/sfpro-text/SFProText-SemiBold.ttf')
  }
];

export default class Prezzo extends Component {
  state = {
    didFontsLoad: false
  };

  async componentDidMount() {
    setConfiguration('API_ROOT', API_ROOT);
    await this.loadFonts();
  }


  async loadFonts() {
    console.log('loading fonts...');
    const images = [
      require('./assets/images/etc/default-avatar.png'),
      require('./assets/images/icons/edit.png'),
      require('./assets/images/location.png'),
      require('./assets/images/map-pin.png')
    ];

    try {
      setConfiguration('API_ROOT', API_ROOT);
      await Promise.all(fonts.map(font => Font.loadAsync(font)));

      await Promise.all([
        images.map(image => Asset.fromModule(image).downloadAsync())
      ]);

      this.setState({ didFontsLoad: true });
      console.log('loaded fonts', Font, typeof Font, ' ');

      this.setState({ didFontsLoad: true });
    } catch (error) {
      console.log('error loading fonts', error);
    }
  }

  render() {
    console.log('rendering...', this.state.didFontsLoad);

    if (this.state.didFontsLoad) {
      console.log('App ready!!');
      const AppViewContainer = require('./src/containers/shared/AppViewContainer').default;
      const store = require('./src/redux/store').default;

      return (
        <Provider store={store}>
          <AppViewContainer />
        </Provider>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );

      // console.log('App Loaded!');
      // console.log(this.state.didFontsLoad);
      // const AppViewContainer = require('./src/containers/shared/AppViewContainer').default;
      // const store = require('./src/redux/store').default;
      //
      // return (
      //   <Provider store={store}>
      //     <AppViewContainer />
      //   </Provider>
      // );
    }
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

// AppRegistry.registerComponent('Prezzo', () => Prezzo);
