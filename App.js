import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {API_ROOT} from './env';
import { setConfiguration } from './src/utils/configuration';
import * as Font from 'expo-font';
require('react-native-browser-polyfill');

global.self = global;

export default class App extends Component {
  state = {
    didFontsLoad: false
  }

  async componentDidMount() {
    setConfiguration('API_ROOT', API_ROOT);
    await this.loadFonts();
  }


  async loadFonts() {
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

        'material': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        'ionicons': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        'entypo': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Entypo.ttf'),
        'feather': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Feather.ttf'),
        'evilicons': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/EvilIcons.ttf'),
        'awesome' : require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
        'foundation' : require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Foundation.ttf'),
        'material-community': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
        'octicons': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Octicons.ttf'),
        'zocial': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Zocial.ttf'),
        'simple-line-icons': require('@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/SimpleLineIcons.ttf')
      });

      this.setState({ didFontsLoad: true });
    } catch (e) {
      console.log('error loading fonts', e);
    }
  }

  render() {
    const { didFontsLoad } = this.state;

    if (!didFontsLoad) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.loading} />
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
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    alignSelf: 'center'
  }
});
