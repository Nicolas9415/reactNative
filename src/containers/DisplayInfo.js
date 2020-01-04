/* eslint-disable prettier/prettier */

import React from 'react';
import { styles } from '../Styles/Styles';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { DisplayInfoItem } from '../components/DisplayInfoItem';
import { ImageDisplay } from '../components/ImageDisplay';


export const DisplayInfo = ({ item, view, visibleInfo, setvisibleInfo, closeModal, deleteTask }) => {
  return (
    view ?
      <View>
        <Modal
          visible={visibleInfo}
          transparent={true}
          onRequestClose={() => setvisibleInfo(false)}
          animationType="fade">
          <TouchableWithoutFeedback onPress={() => setvisibleInfo(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <ScrollView style={styles.scrollView} >
            <Text style={styles.modalTitleInfo}>Task Details</Text>
            <DisplayInfoItem title="Task" content={item.label} />
            <DisplayInfoItem title="Status" content={!item.active ? 'Not yet compleated' : 'Compleated'} />
            <DisplayInfoItem title="Location" content={item.location} />
            <DisplayInfoItem title="Date due" content={item.date.toString() || 'No date added'} />
            <ImageDisplay title="Image" picture={item.picture} content={'No image to show'} />
            <View style={styles.displayActionButtons}>
              <TouchableHighlight underlayColor="lightgray">
                <Text onPress={closeModal} style={styles.buttonsStyle}>Back</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="lightgray" onPress={() => deleteTask(item)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>DELETE</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </Modal>
      </View > : null
  );
};
