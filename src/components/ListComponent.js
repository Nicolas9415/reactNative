/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from '../Styles/Styles';

export const ListComponent = ({ item, index, move, moveEnd, setvisibleInfo, setCurrItem, onChangeEvent }) => {
  return (
    <TouchableOpacity
      style={styles.listElement}
      onLongPress={move}
      onPress={() => { setvisibleInfo(true); setCurrItem(item); }}
      onPressOut={moveEnd}
    >
      <Text style={styles.listText}>{item.label}</Text>
      <CheckBox
        checked={item.active}
        onPress={() => onChangeEvent(item.position)}
        checkedColor={'rgba(92, 168, 224, 1)'}
        checkedIcon="check-square"
        size={35} />
    </TouchableOpacity >
  );
};
