// @flow
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/containers/AppViewContainer';
import {API_ROOT} from './env';
import {setConfiguration} from './src/utils/configuration';
import snapshot from './src/utils/snapshot';

class Prezzo extends Component {

  // clearState = async () => {
  //   //alert();
  //   await snapshot.clearSnapshot();
  //   console.warn('(╯°□°）╯︵ ┻━┻ \nState cleared, Cmd+R to reload the application now');
  // };

  componentDidMount() {
    // this.clearState();
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
