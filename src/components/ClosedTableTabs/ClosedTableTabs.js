import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Feather, Ionicons } from '../VectorIcons';

export default class ClosedTableTabs extends Component {
  onListTypeSelection = section => {
    this.props.onListTypeSelection(section);
  };

  render() {
    const selectedIndex = this.props.currentTab;
    return (
      <View style={styles.container}>
        <View style={styles.listSection}>
          <TouchableOpacity
            onPress={() => this.onListTypeSelection(0)}
            style={styles.textContainer}
          >
            <Text
              style={
                selectedIndex === 0
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              24 Hours
            </Text>
            {selectedIndex === 0 && (
              <View
                style={{ height: 2, width: 38, backgroundColor: '#2ED573' }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onListTypeSelection(1)}
            style={styles.textContainer}
          >
            <Text
              style={
                selectedIndex === 1
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              3 days
            </Text>
            {selectedIndex === 1 && (
              <View
                style={{ height: 2, width: 38, backgroundColor: '#2ED573' }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onListTypeSelection(2)}
            style={styles.textContainer}
          >
            <Text
              style={
                selectedIndex === 2
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              1 Week
            </Text>
            {selectedIndex === 2 && (
              <View
                style={{ height: 2, width: 38, backgroundColor: '#2ED573' }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
