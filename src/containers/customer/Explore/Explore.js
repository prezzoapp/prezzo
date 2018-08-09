// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreList from '../ExploreList';
import styles from './styles';

type Props = {
  listVendors: Function
};

class Explore extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Explore',
    tabBarIcon: props => (
      <Icon name="explore" size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    }
  };

  static displayName = 'Explore';

  componentDidMount() {
    this.props.listVendors();
  }

  render() {
    return (
      <View style={styles.container}>
        <ExploreScreenHeader />
        <ExploreList />
      </View>
    );
  }
}
export default Explore;
