// @flow
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

type Props = {
  text: string,
  onRemove: Function
};

class EditableListItem extends React.Component<Props> {
  render() {
    const {onRemove, text} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {text}
        </Text>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onRemove && onRemove()}
        >
          <Image
            style={styles.icon}
            source={require('../../../assets/images/icons/remove.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditableListItem;
