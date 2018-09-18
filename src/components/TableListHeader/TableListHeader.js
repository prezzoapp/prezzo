import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Feather, Ionicons } from '../VectorIcons';

export default class TableListHeader extends Component {
  state = {
    selectedIndex: 0,
    selectedCategory: 'list'
  };

  onListTypeSelection = index => {
    this.setState({
      selectedIndex: index
    });
    this.props.onListTypeSelection(index);
  };

  onChangeLayout = layout => {
    this.setState({
      selectedCategory: layout
    });
    this.props.onChangeLayout(layout);
  };

  render() {
    const { selectedIndex } = this.state;
    const isList = this.state.selectedCategory === 'list';
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
              Open
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
              Queued
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
              Closed
            </Text>
            {selectedIndex === 2 && (
              <View
                style={{ height: 2, width: 38, backgroundColor: '#2ED573' }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onChangeLayout('list')}
            style={styles.icons}
          >
            <Feather
              name="list"
              size={30}
              style={{ color: isList ? '#2ED573' : 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onChangeLayout('grid')}
            style={styles.icons}
          >
            <Ionicons
              name="ios-keypad"
              size={26}
              style={{ color: !isList ? '#2ED573' : 'white' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.seperator} />
      </View>
    );
  }
}
