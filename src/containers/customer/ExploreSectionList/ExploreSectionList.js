import React, { PureComponent } from 'react';
import { SectionList, View, Text, TouchableOpacity, Image } from 'react-native';

import PropTypes from 'prop-types';

import ExploreSectionListItem from '../../../components/ExploreSectionListItem';

import styles from './styles';

export default class ExploreSectionList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired
  };

  renderSection = sectionTitle => (
    <View style={styles.headerStyle}>
      <Text style={styles.headerTextStyle}>{sectionTitle.toUpperCase()}</Text>
      <TouchableOpacity activeOpacity={0.6}>
        <Image
          source={require('../../../../assets/images/three_dots.png')}
          style={styles.threeDotsImage}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    console.log(
      "Section List Rendering Occurred! Don't Know Why. It Shouldn't be Rendered."
    );

    const { sections } = this.props;

    return (
      <SectionList
        style={{ marginTop: 132.5 }}
        initialNumToRender={3}
        keyExtractor={(item, index) => index}
        sections={sections}
        renderSectionHeader={section =>
          this.renderSection(section.section.title)
        }
        stickySectionHeadersEnabled
        renderItem={({ item }) => <ExploreSectionListItem item={item} />}
      />
    );
  }
}
