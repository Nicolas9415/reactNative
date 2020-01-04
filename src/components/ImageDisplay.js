/* eslint-disable prettier/prettier */

import React from 'react';
import { styles } from '../Styles/Styles';

import {
  View,
  Text,
  Image,

} from 'react-native';
export const ImageDisplay = ({ title, content, picture }) => {
  return (
    <View style={styles.modalContentInfoImage}>
      <Text style={styles.infoTitle}>{title}</Text>
      {picture === null || picture === 'null' ? <View style={styles.emptyImage} >
        <Text style={styles.infoContentImage}>{content}  </Text>
      </View> : <Image source={{ uri: `file://${picture}` }} style={styles.img} resizeMode={'contain'} />
      }
    </View >
  );
};