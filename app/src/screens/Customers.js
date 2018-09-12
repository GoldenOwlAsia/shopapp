import React, { Component } from "react";
import { connect } from 'react-redux';
import { colors } from "../utils/constants";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import { PlusIcon } from '../components/imageUrls';
import TextInput from '../components/TextInput';
import NewCustomerModal from '../components/NewCustomerModal';

import { createCustomer } from '../actions/customer';

class CustomersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Checkout',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.rightButtonHandler()}>
        <Image
          style={styles.headerRightIcon}
          source={PlusIcon}
        />
      </TouchableOpacity>
    )
  });

  static getDerivedStateFromProps= (props, state) => {
    const { customers, orders } = props;
    const allData = customers.map((customer) => {
      const products = orders[customer.id] || [];
      let subTotal = 0;
      let totalQuantity = 0;
      products.forEach(prod => {
        subTotal += (prod.price * prod.quantity);
        totalQuantity+= prod.quantity;
      });
      return {...customer, products, subTotal, totalQuantity }
    });
    state.allData = allData;
    if (state.searchKeyword) {
      state.data = allData.filter((item) => item.name.includes(state.searchKeyword));
    } else {
      state.data = allData;
    }
    return state;
  };

  constructor(props) {
    super(props);

    this.state={
      isAddNewCustomer: false
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({rightButtonHandler: this.handleAddCustomer});
  }

  handleItemClick = (customerId) => {
    console.log('handle item clicked customerId: ', customerId);
  }

  handleCreateCustomer = async (params) => {
    const result = await this.props.createCustomer(params.customerName, params.customerPhoneNumber);
    if (result.type === CREATE_CUSTOMER_SUCCESS) {
      this.closeModal();
      this.props.createOrder(this.props.selectedCustomer, []);
    }
  }

  closeModal = () => {
    this.setModalVisible(false);
  }

  setModalVisible = (isOpen) => {
    this.setState({isAddNewCustomer: isOpen});
  }

  handleAddCustomer = () => {
    this.setModalVisible(true);
  }

  onChangeSearchKeyword = (text) => {
    const filtered = this.state.allData.filter((item) => item.name.includes(text));
    this.setState({
      searchKeyword: text,
      data: filtered
    });
  }

  

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.information}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.totalQuantity} prducts - {item.subTotal} VND</Text>
        </View>
        <View style={styles.imagesWrapper}>
          <Image
            style={styles.productImage}
            source={{uri: (item.products[0] || {}).image}}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          wrapperStyle={styles.searchWrapper}
          placeholder="Search"
          style={styles.searchInput}
          value={this.state.searchKeyword}
          onChangeText={this.onChangeSearchKeyword}
        />
        <FlatList
          style={styles.customerList}
          data={this.state.data}
          renderItem={this.renderItem}
        />
        <NewCustomerModal
          isOpen={this.state.isAddNewCustomer}
          onSubmit={this.handleCreateCustomer}
          onRequestClose={this.closeModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  headerRightIcon: {
    marginRight: 15,
    width: 15,
    height: 15
  },
  itemWrapper: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  information: {
    flexDirection: 'column',
    flex: 1
  },
  productImage: {
    width: 50,
    height: 50
  },
  searchWrapper: {
    padding: 15,
  },
  customerList: {
    paddingLeft: 15,
    paddingRight: 15
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },
  itemPrice: {
    color: 'grey',
    fontSize: 16
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
  createCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
