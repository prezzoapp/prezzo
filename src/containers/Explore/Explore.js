// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DropArrowIcon from 'react-native-vector-icons/EvilIcons';

import SearchInput from '../../components/SearchInput';

import SimpleHorizontalList from './simpleHorizontalList';

import { connect } from 'react-redux';

import * as actions from './simpleHorizontalList/actions';

import {
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM
} from '../../services/constants';

class Explore extends Component {
  static displayName = 'Explore';

  static navigationOptions = {
    title: 'Explore',
    tabBarIcon: props => (
      <Icon name='explore' size={24} color={props.tintColor} />
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

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  renderSection = (section) => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{section.title}</Text>
        <TouchableOpacity activeOpacity={0.6}>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchInput />

          <View style={styles.filterPanel}>
            <Text style={styles.nearMeText}>Near Me</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'rgb(36, 49, 42)' }}>
              <Text style={{ fontFamily: FONT_FAMILY_BOLD, color: 'white', fontSize: 25 }}>Restaurants</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.filter}> Filter</Text>
                  <DropArrowIcon name="chevron-down" size={25} color="#fafafa" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style = {{ marginLeft: 10 }}>
                  <Image source = { require('../../../assets/images/location_icon.png') } style = { styles.threeDotsImage } />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* <SectionList
          keyExtractor={(item, index) => index}
          sections={this.props.sectionListReducer.get('sections').toJS()}
          renderSectionHeader={(section) => this.renderSection(section)}
          renderItem={({ item }) =>
            <SimpleHorizontalList item={item} />
          }
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      backgroundColor: '#2B2C2C',
      paddingTop: 15
    },

    header:
    {
      alignSelf: 'stretch'
    },

    nearMeText:
    {
      fontSize: 15,
      color: 'rgb(50, 209, 119)',
      fontFamily: FONT_FAMILY_MEDIUM
    },

    filterPanel:
    {
      paddingHorizontal: 15,
      paddingTop: 8
    },

    filter:
    {
      color: '#fafafa',
      fontSize: 13
    },

    headerStyle:
    {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    headerTextStyle:
    {
      color: 'white',
      fontSize: 17,
      fontFamily: FONT_FAMILY_BOLD
    },

    threeDotsImage:
    {
      width: 30,
      height: 30,
      resizeMode: 'contain'
    }
  });

const mapStateToProps = (state) => {
  return {
    sectionListReducer: state.get('sectionListReducer'),
    selectedListItemID: state.get('selectedListItemIDReducer')
  }
}

export default connect(mapStateToProps, actions)(Explore);
