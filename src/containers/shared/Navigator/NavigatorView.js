import React from 'react';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import { addListener } from '../../../utils/redux';
import AppNavigator from './Navigator';

const NavigatorView = props => {
  return (
    <Root>
      <AppNavigator
        navigation={{
          dispatch: props.dispatch,
          state: props.navigatorState,
          addListener
        }}
      />
    </Root>
  );
};

NavigatorView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigatorState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default NavigatorView;
