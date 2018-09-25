import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Button from './Button';
import BaseButton from './BaseButton';
import TouchableView from './TouchableView';
import TextInput from './TextInput';
import { colors } from "../utils/constants";

const ContaineComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

class NewCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: props.customer?  (props.customer || {}).name : '',
      customerPhoneNumber: props.customer ? (props.customer || {}).phoneNumber : '',
    };
  }

  onChangeCustomerName = (text) => this.setState({ customerName: text });
  onChangeCustomerPhone = (text) => this.setState({ customerPhoneNumber: text });

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.isOpen}
        transparent={true}
        onRequestClose={this.props.onRequestClose}>
        <ContaineComponent style={styles.modalContainer} behavior="padding" enabled>
          <View style={[styles.contentContainer]}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>{this.props.title}</Text>
            </View>
            <View style={styles.createCustomerForm}>
              <TextInput
                label="Tên khách hàng"
                value={this.state.customerName}
                onChangeText={this.onChangeCustomerName}
                returnKeyType="next"
              />
              <TextInput
                label="Số điện thoại"
                value={this.state.customerPhoneNumber}
                onChangeText={this.onChangeCustomerPhone}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
              <BaseButton
                containerStyle={styles.btnSubmit}
                onPress={this.handleSubmit}
                fullWidth
                title={this.props.submitText}
              />
              <TouchableView onPress={this.props.onRequestClose}>
                <Text style={styles.cancelText}>{this.props.cancleText}</Text>
              </TouchableView>
            </View>
          </View>
        </ContaineComponent>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#00000063',
    height: '100%'
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalTitle: {
    borderBottomWidth: 1,
    flexDirection: 'column',
    borderBottomColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70
  },
  modalTitleText: {
    lineHeight: 24,
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    fontWeight: "700",
    color: "#12283f"
  },
  createCustomerForm: {
    flexDirection: 'column',
    padding: 20,
  },
  btnSubmit: {
    marginTop: 12,
  },
  cancelText: {
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 19,
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: "#12283f"
  }
});

export default NewCustomerModal;