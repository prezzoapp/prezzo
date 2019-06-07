import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import styles from './styles';
import { Feather, Ionicons } from '@expo/vector-icons'

const TableListHeader = props => {
  function onListTypeSelection(index) {
    props.onListTypeSelection(index);
  };

  function onChangeLayout(layout) {
    props.onChangeLayout(layout);
  };

  const selectedIndex = props.currentTab;
  const isList = props.currentLayout === 'list';
  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        {(() => {
          return (
            props.tabNames &&
            props.tabNames.map((item, index) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => onListTypeSelection(index)}
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
              </TouchableOpacity>
            ))
          );
        })()}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            disabled={props.screenName === 'activity'}
            onPress={() => onChangeLayout('list')}
            style={[
              styles.icons,
              { marginRight: wp('9.33%'), marginTop: -2.5 }
            ]}
          >
            <Feather
              name="list"
              size={wp('6.93%')}
              style={{
                color: props.screenName === 'activity'
                    ? 'transparent'
                    : isList
                      ? '#2ED573'
                      : 'white'
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={props.screenName === 'activity'}
            onPress={() => onChangeLayout('grid')}
            style={styles.icons}
          >
            <Ionicons
              name="ios-keypad"
              size={wp('5.6%')}
              style={{
                color: props.screenName === 'activity'
                    ? 'transparent'
                    : !isList
                      ? '#2ED573'
                      : 'white'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
    </View>
  );
};

TableListHeader.defaultProps = {
  screenName: ''
};

TableListHeader.propTypes = {
  onListTypeSelection: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
  currentLayout: PropTypes.string.isRequired,
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  screenName: PropTypes.string
};

export default TableListHeader;
