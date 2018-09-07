// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import NavigatorViewContainer from '../../shared/Navigator/NavigatorViewContainer';
import * as snapshotUtil from '../../../utils/snapshot';
import * as SessionStateActions from '../../../modules/session';
import store from '../../../redux/store';
import DeveloperMenu from '../../../components/DeveloperMenu';
import { Font } from 'expo';
import MaterialIcons from '../../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import EvilIcons from '../../../../node_modules/@expo/vector-icons/fonts/EvilIcons.ttf';

class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    isFontsLoaded: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadFonts()
    snapshotUtil.resetSnapshot().then(snapshot => {
      const { dispatch } = this.props;

      if (snapshot) {
        dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
      } else {
        dispatch(SessionStateActions.initializeSessionState());
      }

      store.subscribe(() => {
        snapshotUtil.saveSnapshot(store.getState());
      });
    });
  }

  async loadFonts(){
    try {
      await Font.loadAsync({
        'ClearSans-Light': require('../../../../assets/fonts/clear-sans/ClearSans-Light.ttf'),
        'ClearSans-Medium': require('../../../../assets/fonts/clear-sans/ClearSans-Medium.ttf'),
        'ClearSans-Bold': require('../../../../assets/fonts/clear-sans/ClearSans-Bold.ttf'),
        EvilIcons,
        MaterialIcons
      });
      this.props.dispatch(SessionStateActions.resetStateAfterFontLoaded(true));
    } catch (error) {
      alert(error.message)
    }
   }

  render() {
    
    if (!this.props.isReady || !this.props.isFontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#455a64" barStyle="light-content" />
        <NavigatorViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
