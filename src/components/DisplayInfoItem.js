/* eslint-disable prettier/prettier */

import React from 'react';
import { styles } from '../Styles/Styles';
import { View, Text } from 'react-native';
export const DisplayInfoItem = ({ title, content }) => {
    return (
        <View style={styles.modalContentInfo}>
            <Text style={styles.infoTitle}>{title}</Text>
            <Text style={styles.infoContnet}>{content}</Text>
            <View style={styles.dividerLine} />
        </View >
    );
};
