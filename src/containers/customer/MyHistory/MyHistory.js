import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator, InteractionManager } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE, COLOR_BLACK } from '../../../services/constants';
import MyHistoryItem from '../../../components/MyHistoryItem';
import LoadingComponent from '../../../components/LoadingComponent';
import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';
import styles from './styles';

class MyHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('70%'),
          fontSize: wp('5%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        My History
      </Text>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('7%')}
        />
      </TouchableOpacity>
    )
  });

  static displayName = 'MyHistory';

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.listCompletedOrders(this.props.userId, 'complete')
        .then(() => {})
        .catch(err => {
          if(err.code === 401) {
            manuallyLogout(err, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', err);
          }
        });
    });
  }

  renderItem = data => <MyHistoryItem item={data.item} />;

  listEmptyComponent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.message}>No items found!</Text>
      </View>
    );
  }

  render() {
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={[
            styles.contentContainerStyle,
            { justifyContent: (data.size === 0) ? 'center' : null }
          ]}
          ListEmptyComponent={this.listEmptyComponent}
          keyExtractor={item => item.get('_id').toString()}
          data={data.toArray()}
          renderItem={this.renderItem}
        />
        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

export default MyHistory;
