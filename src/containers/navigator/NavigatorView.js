import React, {Component} from 'react';
import {Root} from 'native-base';
import PropTypes from 'prop-types';
import {addNavigationHelpers} from 'react-navigation';
import {addListener} from '../../utils/redux';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  render() {
    return (
      <Root>
        <AppNavigator
          navigation={
            addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.navigatorState,
              addListener
            })
          }
        />
      </Root>
    );
  }
}

export default NavigatorView;
