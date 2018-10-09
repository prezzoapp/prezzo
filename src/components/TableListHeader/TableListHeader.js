import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';
import { Feather, Ionicons } from '../VectorIcons';

export default class TableListHeader extends Component {

  onListTypeSelection = index => {
    this.props.onListTypeSelection(index);
  };

  onChangeLayout = layout => {
    this.props.onChangeLayout(layout);
  };

  render() {
    const selectedIndex = this.props.currentTab;
    const isList = this.props.currentLayout === 'list';
    return (
      <View style={styles.container}>
        <View style={styles.listSection}>
          {(() => {
            return (
              this.props.tabNames &&
              this.props.tabNames.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => this.onListTypeSelection(index)}
                  style={styles.textContainer}
                >
                  <View style={
                    selectedIndex === index
                      ? styles.selectedTab
                      : styles.unselectedTab
                    }
                  >
                    <Text
                      style={
                        selectedIndex === index
                          ? styles.selectedText
                          : styles.unselectedText
                      }
                    >
                      {item}
                    </Text>
                  </View>
                  {/*selectedIndex === index && (
                    <View
                      style={{
                        height: 2,
                        width: '70%',
                        backgroundColor: '#2ED573'
                      }}
                    />
                  )}*/}
                </TouchableOpacity>
              ))
            );
          })()}
          <TouchableOpacity
            onPress={() => this.onChangeLayout('list')}
            style={[
              styles.icons,
              { alignItems: 'flex-start', marginRight: wp('5%') }
            ]}
          >
            <Feather
              name="list"
              size={wp('8%')}
              style={{ color: isList ? '#2ED573' : 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onChangeLayout('grid')}
            style={styles.icons}
          >
            <Ionicons
              name="ios-keypad"
              size={wp('7%')}
              style={{ color: !isList ? '#2ED573' : 'white' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.seperator} />
      </View>
    );
  }
}
