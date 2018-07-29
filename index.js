// @flow
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/containers/shared/AppViewContainer';
import {API_ROOT} from './env';
import {setConfiguration} from './src/utils/configuration';
require('react-native-browser-polyfill');

global.self = global;

class Prezzo extends Component {
  componentDidMount() {
    setConfiguration('API_ROOT', API_ROOT);
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Prezzo', () => Prezzo);
