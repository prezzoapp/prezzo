// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { AppRegistry, View, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons, EvilIcons, Ionicons, Feather, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
//import MaterialIcons from '@expo/vector-icons/fonts/MaterialIcons.ttf'
// import store from './src/redux/store';
// import AppViewContainer from './src/containers/shared/AppViewContainer';
import {API_ROOT} from './env';
import {setConfiguration} from './src/utils/configuration';
import { Font, Icon } from 'expo';
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

    try {
      await Font.loadAsync({
        'ClearSans-Light': require('./assets/fonts/clear-sans/ClearSans-Light.ttf'),
        'ClearSans-Medium': require('./assets/fonts/clear-sans/ClearSans-Medium.ttf'),
        'ClearSans-Bold': require('./assets/fonts/clear-sans/ClearSans-Bold.ttf'),
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
        'simple-line-icons': require('@expo/vector-icons/fonts/SimpleLineIcons.ttf'),

      });

      this.setState({ didFontsLoad: true });
      console.log('loaded fonts', Font, typeof Font, ' ');
      
      // this.props.dispatch(SessionStateActions.resetStateAfterFontLoaded(true));

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
