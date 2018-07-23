import React, {PureComponent} from 'react';
import {SectionList, View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import Lists from './lists';

import {
    FONT_FAMILY_BOLD
  } from '../../../services/constants';

class MainList extends PureComponent {
  static propTypes = {
    sectionListReducer: PropTypes.object
  };

  constructor() {
    super();
  }

  renderSection = (sectionTitle) => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{sectionTitle.toUpperCase()}</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Image source={require('../../../../assets/images/three_dots.png')} style={styles.threeDotsImage} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const sectionList = this.props.sectionListReducer.get('sections').toJS();
    return (
        <SectionList
            style={{marginTop: 115.333}}
            initialNumToRender={3}
            keyExtractor={(item, index) => index}
            sections={sectionList}
            renderSectionHeader={(section) => this.renderSection(section.section.title)}
            stickySectionHeadersEnabled={true}
            renderItem={({item, section}) =>
                <Lists item={item} sectionName={section.title} />
            }
        />
    );
  }
}

const styles = StyleSheet.create(
  {
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
    sectionListReducer: state.get('sectionListReducer')
  };
};

export default connect(mapStateToProps, null)(MainList);
