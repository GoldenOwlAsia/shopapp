import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
} from 'react-native';
import Button from './Button';
import TextInput from './TextInput';
import { colors } from "../utils/constants";

class NewCustomerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: '',
      customerPhoneNumber: ''
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
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>New customer</Text>
            </View>
            <View style={styles.createCustomerForm}>
              <TextInput
                wrapperStyle={styles.textInput}
                placeholder="Customer's name"
                value={this.state.customerName}
                onChangeText={this.onChangeCustomerName}
              />
              <TextInput
                wrapperStyle={styles.textInput}
                placeholder="Phone number"
                value={this.state.customerPhoneNumber}
                onChangeText={this.onChangeCustomerPhone}
              />
              <View style={styles.buttonsWrapper}>
                <Button
                  text="New customer"
                  primary
                  centerText
                  onPress={this.handleSubmit}
                />
                <Button
                  text="No, do it later"
                  centerText
                  textStyle={{color: 'black'}}
                  onPress={this.props.onRequestClose}
                />
              </View>
            </View>
          </View>
        </View>
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
    height: 320,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  modalTitle: {
    borderBottomWidth: 1,
    flexDirection: 'column',
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15
  },
  createCustomerForm: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20
  },
  textInput: {
    marginTop: 20,
    height: 50
  },
  buttonsWrapper: {
    marginTop: 20,
    marginBottom: 20,
    flexWrap: 'wrap'
  }
});

export default NewCustomerModal;