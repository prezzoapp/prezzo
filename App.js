// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons, EvilIcons, Ionicons, Feather, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import {API_ROOT} from './env';
import {setConfiguration} from './src/utils/configuration';
import { Font, Icon, Asset } from 'expo';
import 'expo';
require('react-native-browser-polyfill');

global.self = global;

class Prezzo extends Component {
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
      require('./assets/images/etc/default-avatar.png')
    ];

    try {
      await Font.loadAsync({
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
        'SFProText-SemiBold': require('./assets/fonts/sfpro-text/SFProText-SemiBold.ttf'),

        'material': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
        'ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
        'entypo': require('@expo/vector-icons/fonts/Entypo.ttf'),
        'feather': require('@expo/vector-icons/fonts/Feather.ttf'),
        'evilicons': require('@expo/vector-icons/fonts/EvilIcons.ttf'),
        'awesome' : require('@expo/vector-icons/fonts/FontAwesome.ttf'),
        'foundation' : require('@expo/vector-icons/fonts/Foundation.ttf'),
        'material-community': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
        'octicons': require('@expo/vector-icons/fonts/Octicons.ttf'),
        'zocial': require('@expo/vector-icons/fonts/Zocial.ttf'),
        'simple-line-icons': require('@expo/vector-icons/fonts/SimpleLineIcons.ttf')
      });

      images.map(async (image) => await Asset.fromModule(image).downloadAsync());

      this.setState({ didFontsLoad: true });
      console.log('loaded fonts', Font, typeof Font, ' ');

    } catch (error) {
      console.log('error loading fonts', error);
    }
   }

  render() {
    console.log('rendering...');

    if (!this.state.didFontsLoad) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    const AppViewContainer = require('./src/containers/shared/AppViewContainer').default;
    const store = require('./src/redux/store').default;

    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('Prezzo', () => Prezzo);
