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
  Alert,
  AsyncStorage,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { PlusIcon } from '../components/imageUrls';
import SearchBar from '../components/SearchBar';
import CustomerItem from '../components/CustomerItem';
import NewCustomerModal from '../components/NewCustomerModal';
import { CREATE_CUSTOMER_SUCCESS } from '../actions/types';

import { createCustomer, changeSelectedCustomer } from '../actions/customer';
import { createOrder } from '../actions/order';
import { LogoutIcon } from '../components/icons';

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
      <LogoutIcon onPress={() => {
        Alert.alert(
          'Xác Nhận',
          'Bạn có thật sự muốn đăng xuất ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: async () => {
              await AsyncStorage.clear();

              navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AuthLoading' })],
                key: null,
              }));

            }},
          ],
          { cancelable: false }
        )
      }} />
    ),
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
        onDelete={() => {}}
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
    padding: 20,
  },
  list: {
    marginTop: 20,
  },
  headerRightIcon: {
    marginRight: 15,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
