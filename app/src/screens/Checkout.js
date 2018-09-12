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
} from "react-native";

import PropTypes from "prop-types";
import { BackArrow, UpArrow, DownArrow, Trash } from '../components/imageUrls';
import Button from '../components/Button';
import SlideDownView from '../components/SlideDownView';

import { removeItemFormOrder, increaseItemQuantity, decreaseItemQuantity, checkout } from '../actions/order';
import { CHECKOUT_SUCCESS } from "../actions/types";
import { clearSelectedCustomer } from '../actions/customer';

class CheckOutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Checkout',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.headerLeftIcon}
          source={BackArrow}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    const customer = props.customers.filter((c) => c.id === props.selectedCustomer)[0];
    const items = props.orders[props.selectedCustomer];
    this.itemRefs = new Array(items.length);
    this.state = {
      tax: 0,
      customer,
    };
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
      this.props.navigation.navigate('Home');
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
    this.props.removeItemFormOrder(this.props.selectedCustomer, itemId);
  }

  calculateSubTotal = (items) => {
    let result = 0;
    items.forEach((item) => {
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
    console.log('edit customer');
  }

  renderItem = ({item, index}) => {
    const totalPrice = item.price * item.quantity;
    const toggleButtonImage = item.isOpenQuantity ? UpArrow : DownArrow;
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemInformation}>
          <TouchableOpacity onPress={() => this.toggleItemDetail(index)}>
            <Image
              style={styles.toggleButton}
              source={toggleButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemTotalPrice}>{totalPrice}</Text>
        </View>
        <SlideDownView ref={(ref) => {this.itemRefs[index] = ref}}
          style={styles.itemQuantity}
          startVal={0}
          endVal={50}
        >
          <View style={styles.quantityBlock}>
            <Text>Quantity: </Text>
            <TouchableOpacity onPress={() => this.decreaseQuantity(item, index)} style={styles.itemAction}>
              <Text>-</Text>
            </TouchableOpacity>
            <View style={styles.itemAction}>
              <Text>{item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => this.increaseQuantity(item, index)} style={styles.itemAction}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.removeItem(item.id)}>
            <Image
              style={styles.btnRemove}
              source={Trash}
            />
          </TouchableOpacity>
        </SlideDownView>
      </View>
    );
  }

  render() {
    const { customer } = this.state;
    const items = this.props.orders[customer.id];
    const subTotal = this.calculateSubTotal(items);
    const taxAmount = this.calculateTax(subTotal);
    const grandTotal = this.calculateGrandTotal(subTotal, taxAmount);
    return (
      <View style={styles.containerWrapper}>
        <ScrollView style={styles.contentWrapper}>
          <FlatList
            contentContainerStyle={styles.containerPadding}
            data={items}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.id}
          />

          <View style={[styles.summaryWrapper, styles.containerPadding]}>
            <View style={styles.row}>
              <Text style={styles.label}>Sub total: </Text>
              <Text>{subTotal}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tax: </Text>
              <Text>{taxAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.grandTotal]}>Grand total:</Text>
              <Text style={[styles.grandTotal, styles.blueColor]}>{grandTotal}</Text>
            </View>
          </View>

          <View style={[styles.customerWrapper, styles.containerPadding]}>
            <Text style={styles.title}>Customer </Text>
            <Text>{customer.name}</Text>
            <Text>{customer.phoneNumber}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>{customer.address}</Text>
              <TouchableOpacity onPress={this.editCustomer}>
                <Text style={[styles.blueColor]}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.footerButton, styles.containerPadding]}>
          <Button
            text="Checkout"
            primary
            centerText
            onPress={this.handleCheckout}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 15,
    width: 18,
    height: 13
  },
  containerPadding: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  containerWrapper: {
    backgroundColor: colors.WHITE,
    flex: 1
  },
  contentWrapper: {
    flex: 1,
  },
  footerButton: {
    marginTop: 15,
    marginBottom: 15,
  },
  summaryWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.GREY,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  customerWrapper: {
    paddingTop: 20,
    paddingBottom: 20
  },
  itemWrapper: {
    justifyContent: 'center',
    marginTop: 15
  },
  itemInformation: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
  toggleButton: {
    width: 16,
    height: 10,
    marginRight: 15
  },
  itemName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemTotalPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.BLUE
  },
  itemQuantity: {
    backgroundColor: colors.GREY,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  quantityBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAction: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnRemove: {
    width: 10,
    height: 14
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    flex: 1
  },
  grandTotal: {
    fontWeight: 'bold',
    fontSize: 17
  },
  blueColor: {
    color: colors.BLUE
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
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
  removeItemFormOrder,
  checkout,
  clearSelectedCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen);
