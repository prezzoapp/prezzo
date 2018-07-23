import React, {Component} from 'react';
import {FlatList, View, Dimensions} from 'react-native';

import ListItem from './listItem';

import Carousel from 'react-native-snap-carousel';

import PropTypes from 'prop-types';

export default class Lists extends Component {
  static propTypes = {
    sectionName: PropTypes.string,
    item: PropTypes.array
  };

  constructor() {
    super();
  }

  render() {
    console.log('Lists Components Render Called!');
    return (
      <View style={{flex: 1}}>
          { (this.props.sectionName === 'trending') &&
              <FlatList
                  initialNumToRender = { 10 }
                  contentContainerStyle={{paddingLeft: 15, paddingBottom: 15}}
                  horizontal={true}
                  keyExtractor={(item) => item.id}
                  data={this.props.item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) =>
                      <ListItem
                          item={item} sectionName={this.props.sectionName}
                      />
                  }
              />
          }

          { (this.props.sectionName === 'featured') &&
              <View style = {{paddingBottom: 15}}>
                  <Carousel
                      layout={'default'}
                      ref={(c) => { this._carousel = c; }}
                      data={this.props.item}
                      sliderWidth={Dimensions.get('window').width}
                      itemWidth={Dimensions.get('window').width - 50}
                      renderItem={({item}) =>
                          <ListItem
                              item={item} sectionName={this.props.sectionName}
                          />
                      }
                  />
              </View>
          }
      </View>
    );
  }
}
