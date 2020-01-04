/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { styles } from '../Styles/Styles';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const EnterTask = ({
  visible,
  closeModal,
  chooseImage,
  textField,
  setTextField,
  showDatePicker,
  isDatePickerVisible,
  handleConfirm,
  hideDatePicker,
  addTask,
}
) => {
  return visible ? (
    <View>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={closeModal}
        animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Please enter your task details</Text>
          <View style={styles.textFieldContainer}>
            <Text>Task Description</Text>
            <TextInput
              style={styles.textinput}
              value={textField}
              onChangeText={e => setTextField(e)}
              placeholder="Task description"
            />
          </View>
          <View style={styles.imagePicker}>
            <Text>Add and image</Text>
            <Icon
              size={20}
              name="camera"
              type="font-awesome"
              onPress={chooseImage}
            />
          </View>
          <View style={styles.imagePicker}>
            <Text>When is the task due?</Text>
            <Icon
              size={20}
              name="calendar"
              type="font-awesome"
              onPress={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.actionsButton}>
            <TouchableHighlight underlayColor="lightgray">
              <Text style={styles.buttonsStyle} onPress={closeModal}>
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="lightgray" onPress={addTask}>
              <Text style={styles.buttonsStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  ) : null;
};
