// @flow
import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, SectionList} from 'react-native';
import PropTypes from 'prop-types';

import SimpleHorizontalList from './simpleHorizontalList';

import {connect} from 'react-redux';

import * as actions from './simpleHorizontalList/actions';

import HeaderSection from './headerSection';

import {
  FONT_FAMILY_BOLD
} from '../../services/constants';

class Explore extends Component {
  static displayName = 'Explore';

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    sectionListReducer: PropTypes.object
  };

  constructor()
  {
    super();
  }

  renderSection = (sectionTitle) => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{sectionTitle.toUpperCase()}</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Image source={require('../../../assets/images/three_dots.png')} style={styles.threeDotsImage} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderSection />

        <SectionList
          style={{marginTop: 115.333}}
          initialNumToRender={3}
          keyExtractor={(item, index) => index}
          sections={this.props.sectionListReducer.get('sections').toJS()}
          renderSectionHeader={(section) => this.renderSection(section.section.title)}
          stickySectionHeadersEnabled={true}
          renderItem={({item, section}) =>
            <SimpleHorizontalList item={item} sectionName={section.title} />
          }
        />
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

    threeDotsImage:
    {
      width: 20,
      height: 20,
      resizeMode: 'contain'
    },

    headerStyle:
    {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2B2C2C'
    },

    headerTextStyle:
    {
      color: 'white',
      fontSize: 17,
      fontFamily: FONT_FAMILY_BOLD
    }
  });

const mapStateToProps = (state) => {
  return {
    sectionListReducer: state.get('sectionListReducer'),
    selectedListItemID: state.get('selectedListItemIDReducer')
  };
};

export default connect(mapStateToProps, actions)(Explore);
