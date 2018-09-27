import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from "../utils/constants";

class ErrorModal extends Component {
  
  render() {
    const { visible, title, message, onHideModal } = this.props;
    return (
      <Modal
        animationType="fade"
        visible={visible}
        transparent={true}>
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPressOut={onHideModal}
        >
          <TouchableWithoutFeedback>
            <View style={[styles.contentContainer]}>
              <Text style={styles.title}>{title || 'Error'}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000063',
    height: '100%'
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
    width: '80%',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    fontWeight: '700',
    color: "#12283f"
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 19,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#12283f"
  },
  
});

export default ErrorModal;