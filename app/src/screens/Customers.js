import React, { Component } from "react";
import { connect } from 'react-redux';
import { colors } from "../utils/constants";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { PlusIcon, Hamburger } from '../components/imageUrls';
import SearchBar from '../components/SearchBar';
import CustomerItem from '../components/CustomerItem';
import NewCustomerModal from '../components/NewCustomerModal';
import { CREATE_CUSTOMER_SUCCESS } from '../actions/types';

import { createCustomer, changeSelectedCustomer, removeCustomer } from '../actions/customer';
import { createOrder } from '../actions/order';

class CustomersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Danh sách khách',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.rightButtonHandler()}>
        <Image
          style={styles.headerRightIcon}
          source={PlusIcon}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={{ width: 16, height: 12, marginLeft: 12 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 0,
    },
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
    this.props.navigation.setParams({ handler: this.openModal });
  }

  openModal = () => {
    // const selectedProducts = this.state.products.filter((item) => item.quantity && item.quantity > 0);
    if (this.props.customers.length === 0) this.renderAlert('Nhắc nhở', 'Vui lòng tạo khách hàng');
    else {
      // this.props.updateOrderByCustomer({ customerId: this.props.selectedCustomer, items: selectedProducts });
      this.props.navigation.navigate('Checkout');
    }
  }

  handleItemClick = async (customer) => {
    await this.props.changeSelectedCustomer(customer.id);
    this.props.navigation.navigate('Home', {title: customer.customerName});
  }

  handleCreateCustomer = async (params) => {
    if (params.customerName === '' || params.customerPhoneNumber === '') {
      this.renderAlert('Nhắc nhở', 'Điền đầy đủ thông tin khách hàng');
    } else {
      const result = await this.props.createCustomer(params.customerName, params.customerPhoneNumber);
      if (result.type === CREATE_CUSTOMER_SUCCESS) {
        this.closeModal();
        this.props.createOrder(this.props.selectedCustomer, []);
      }
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

  handleRemoveCustomer = async (customerId) => {
    await this.props.removeCustomer(customerId);
    this.renderAlert('Thành công', 'Xoá khách hàng thành công!',);
  }

  renderItem = ({ item }) => {
    return (
      <CustomerItem
        item={{
          id: item.id,
          customerName: item.name,
          quantity: item.totalQuantity,
          total: item.subTotal,
          products: item.products,
        }}
        onItemClick={this.handleItemClick}
        onDelete={() => this.handleRemoveCustomer(item.id)}
      />
    )
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSearchBox}>
          <SearchBar placeholder="Tìm kiếm" onChangeText={this.onChangeSearchKeyword} value={this.state.searchKeyword} />
        </View>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={() => (<View style={styles.divider} />)}
        />

        <NewCustomerModal
          isOpen={this.state.isAddNewCustomer}
          onSubmit={this.handleCreateCustomer}
          onRequestClose={this.closeModal}
          submitText={'Tạo mới'}
          cancleText={'Không, thêm khách hàng sau'}
          title={'Thêm khách hàng mới'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerSearchBox: {
    paddingHorizontal: 12,
  },
  list: {
    marginTop: 24,
  },
  headerRightIcon: {
    marginRight: 12,
    width: 15,
    height: 15
  },
  divider: {
    height: 1,
    backgroundColor: '#f4f4f4',
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
  createCustomer,
  changeSelectedCustomer,
  createOrder,
  removeCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
