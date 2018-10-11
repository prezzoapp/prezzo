import React, { Component } from 'react';
import { BottomTabBar } from 'react-navigation-tabs';

class VendorTabBar extends Component {
  constructor() {
    super();
    this.state = { tabBarVisible: true }
  }
  componentWillReceiveProps(props) {
    console.log(props.navigation.state.routes[props.navigation.state.index].routes.length);
    if (
      props.navigation.state.routes[props.navigation.state.index].routes.length > 1) {
      if( props.navigation.state.routes[props.navigation.state.index].routes[1]
        .params.visible === false )
        {
          this.setState(() => {
            return {
              tabBarVisible: false
            }
          });
        } else {
          this.setState(() => {
            return {
              tabBarVisible: true
            }
          });
        }
    }
    // this.setState({ tabBarVisible: false });

    // const oldState = this.props.navigation.state;
    // const oldRoute = oldState.routes[oldState.index];
    // const oldParams = oldRoute.params;
    // const wasVisible = !oldParams || oldParams.visible;
    //
    // const newState = props.navigation.state;
    // const newRoute = newState.routes[newState.index];
    // const newParams = newRoute.params;
    // const isVisible = !newParams || newParams.visible;

    // if (wasVisible && !isVisible) {
    //   Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: 200 }).start();
    // } else if (isVisible && !wasVisible) {
    //   Animated.timing(this.state.offset, { toValue: 0, duration: 200 }).start();
    // }
  }

  render() {
    return this.state.tabBarVisible ? <BottomTabBar {...this.props} /> : null;
  }
}

export default VendorTabBar;
