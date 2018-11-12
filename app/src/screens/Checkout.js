import React, { Component } from "react";
import { connect } from 'react-redux';
import { colors } from "../utils/constants";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import PropTypes from "prop-types";
import { BackArrow, UpArrow, DownArrow, Trash } from '../components/imageUrls';
import Button from '../components/Button';
import SlideDownView from '../components/SlideDownView';
import NewCustomerModal from '../components/NewCustomerModal';
import CheckoutItem from '../components/CheckoutItem';
import TouchableView from '../components/TouchableView';
import BaseButton from '../components/BaseButton';
import { formatMoney } from '../utils/helpers';

import { removeItemFromOrder, increaseItemQuantity, decreaseItemQuantity, checkout } from '../actions/order';
import { CHECKOUT_SUCCESS, UPDATE_CUSTOMER_SUCCESS } from "../actions/types";
import { clearSelectedCustomer, updateCustomer, removeCustomer } from '../actions/customer';

class CheckOutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.state.params.goBack()}>
        <Image
          style={styles.headerLeftIcon}
          source={BackArrow}
        />
      </TouchableOpacity>
    )
  });

  static getDerivedStateFromProps= (props, state) => {
    if (props.selectedCustomer) {
      const customer = props.customers.filter((c) => c.id === props.selectedCustomer)[0];
      const items = props.orders[props.selectedCustomer];
      this.itemRefs = new Array((items || []).length);
      state = {
        tax: 0,
        customer,
        isEditCustomer: false
      };
    }

    return state;
  }

  constructor(props) {
    super(props);
    const customer = props.customers.filter((c) => c.id === props.selectedCustomer)[0];
    const items = props.orders[props.selectedCustomer] || [];
    this.itemRefs = new Array(items.length);
    this.state = {
      tax: 0,
      customer,
      isEditCustomer: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({goBack: this.goBack});
  }

  handleCheckout = async () => {
    let items = this.props.orders[this.props.selectedCustomer].map((item) => {delete item.__typename; return item;});
    const subTotal = this.calculateSubTotal(items);
    const tax = this.calculateTax(subTotal);
    const grandTotal = this.calculateGrandTotal(subTotal, tax)

    let params = {
      items,
      subTotal,
      tax,
      grandTotal,
      createdBy: 1,
      customerId: this.state.customer.id
    }

    const result = await this.props.checkout(params);
    if (result.type === CHECKOUT_SUCCESS) {
      this.props.clearSelectedCustomer();
      this.props.removeCustomer(this.state.customer.id);
      this.renderAlert('Thành công', 'Thực hiện thanh toán thành công', () => {
        this.props.navigation.navigate('Home', {title: ''});
      });
    }
  }

  decreaseQuantity = (item, index) => {
    this.props.decreaseItemQuantity(this.props.selectedCustomer, item.id);
  }

  increaseQuantity = (item, index) => {
    this.props.increaseItemQuantity(this.props.selectedCustomer, item.id);
  }

  removeItem = (itemId) => {
    // TODO: Handle pop up confirm remove!
    this.props.removeItemFromOrder(this.props.selectedCustomer, itemId);
  }

  goBack = () => {
    this.props.navigation.navigate('Home', { title: this.state.customer.name});
  }

  calculateSubTotal = (items) => {
    let result = 0;
    (items || []).forEach((item) => {
      result += item.quantity * item.price;
    });

    return result;
  }

  calculateGrandTotal = (subTotal, tax) => {
    return subTotal + tax;
  }

  calculateTax = (subTotal) => {
    return this.state.tax ? subTotal * this.state.tax : 0;
  }

  toggleItemDetail = (index) => {
    const ref = this.itemRefs[index];
    ref.toggleOpen();
  }

  editCustomer = () => {
    this.openModal();
  }

  closeModal = () => this.setState({isEditCustomer: false});
  
  openModal = () => this.setState({isEditCustomer: true});

  handleUpdateCustomer = async (params) => {
    if (params.customerName === '' || params.customerPhoneNumber === '') {
      this.renderAlert('Nhắc nhở', 'Điền đầy đủ thông tin khách hàng');
    } else {
      const result = await this.props.updateCustomer({ name: params.customerName, phoneNumber: params.customerPhoneNumber, id: this.props.selectedCustomer });
      if (result.type === UPDATE_CUSTOMER_SUCCESS) {
        this.setState({
          customer: { ...result.payload }
        })
        this.closeModal();
      }
    }
  }

  renderAlert = (title, message, onPressOK) => (
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: onPressOK},
      ],
      { cancelable: true }
    )
  )

  renderItem = ({item, index}) => {
    const totalPrice = item.price * item.quantity;
    const toggleButtonImage = item.isOpenQuantity ? UpArrow : DownArrow;

    return (
      <CheckoutItem
        productName={item.name}
        totalPrice={totalPrice}
        quantity={item.quantity}
        onDecrease={() => this.decreaseQuantity(item, index)}
        onIncrease={() => this.increaseQuantity(item, index)}
        onRemove={() => this.removeItem(item.id)}
      />
    )
  }

  render() {
    const { customer } = this.state;
    const items = this.props.orders[customer.id];
    const subTotal = this.calculateSubTotal(items);
    const taxAmount = this.calculateTax(subTotal);
    const grandTotal = this.calculateGrandTotal(subTotal, taxAmount);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.title}>Thanh toán</Text>
          <Divider />
          <FlatList
            data={items}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${item.id}`}
            ItemSeparatorComponent={() => (<View style={styles.listDivider} />)}
          />
          <Divider />
          <View style={styles.row}>
            <Text style={styles.label}>Tổng giá</Text>
            <Text>{formatMoney(subTotal)} VNĐ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Thuế</Text>
            <Text>{formatMoney(taxAmount)} VNĐ</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.grandTotal, { color: "#0F2336" }]}>Tổng cộng</Text>
            <Text style={[{ color: '#5175FF' }, styles.grandTotal]}>{formatMoney(grandTotal)} VNĐ</Text>
          </View>
          <Divider />
          <View style={styles.customerInfo}>
            <Text style={styles.customerInfoTitle}>Thông tin khách hàng</Text>
            <Text style={styles.customerInfoText}>{customer.name}</Text>
            <Text style={styles.customerInfoText}>{customer.phoneNumber}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.customerInfoText}>{customer.address? customer.address : ''}</Text>
              <TouchableView onPress={this.editCustomer}>
                <Text style={styles.editText}>Chỉnh sửa</Text>
              </TouchableView>
            </View>
          </View>
        </ScrollView>
        <BaseButton
          onPress={this.handleCheckout}
          fullWidth
          title="Xác nhận"
          containerStyle={styles.btnCheckout}
        />
        <NewCustomerModal
          customer={this.state.customer}
          isOpen={this.state.isEditCustomer}
          onSubmit={this.handleUpdateCustomer}
          onRequestClose={this.closeModal}
          submitText={'Cập nhật'}
          cancleText={'Cập nhật sau'}
          title={'Cập nhật thông tin khách hàng'}
        />
      </View>
    )
  }
}

const Divider = () => (
  <View style={styles.divider} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listDivider: {
    height: 8,
  },
  divider: {
    height: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: -20,
    backgroundColor: '#f4f4f4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  label: {
    lineHeight: 19,
    fontSize: 14,
    color: "#8a8a8a"
  },
  grandTotal: {
    lineHeight: 19,
    fontSize: 14,
    fontWeight: '700',
  },
  customerInfo: {

  },
  customerInfoTitle: {
    lineHeight: 30,
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#666666"
  },
  customerInfoText: {
    fontSize: 14,
    color: "#8a8a8a",
    lineHeight: 24,
  },
  editText: {
    lineHeight: 19,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#3a62ff"
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#666666',
  },
  btnCheckout: {
    padding: 20,
  },
  title: {
    lineHeight: 32,
    fontSize: 24,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#12283f"
  },
  headerLeftIcon: {
    marginLeft: 15,
    width: 18,
    height: 13
  },
});

const mapStateToProps = state => {
  return {
    selectedCustomer: state.Customer.selectedCustomer,
    customers: state.Customer.list,
    orders: state.Order.list,
  }
};

const mapDispatchToProps = {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromOrder,
  checkout,
  clearSelectedCustomer,
  updateCustomer,
  removeCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen);
