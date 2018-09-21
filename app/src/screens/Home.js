import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  AsyncStorage,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Squares,
  Hamburger
} from '../components/imageUrls';
import SearchBar from '../components/SearchBar';
import TextInput from '../components/TextInput';
import NewCustomerModal from '../components/NewCustomerModal';
import ProductItem from '../components/ProductItem';

import { getAllProducts } from '../actions/product';
import { createCustomer } from '../actions/customer';
import { createOrder, updateOrderByCustomer } from '../actions/order';
import { CREATE_CUSTOMER_SUCCESS } from "../actions/types";

class HomeScreen extends Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  static getDerivedStateFromProps= (props, state) => {
    const allProducts = props.products.map((item) => ({ ...item, quantity: 0}));
    if (props.selectedCustomer) {
      const selectedCustomer = props.selectedCustomer
      const selectedProducts = props.orders[selectedCustomer];
      (selectedProducts || []).forEach((prod) => {
        const prodIndex = allProducts.findIndex((item) => item.id === prod.id);
        if (prodIndex > -1) {
          allProducts[prodIndex].quantity = prod.quantity;
        }
      });
    }

    state.products = allProducts;
    
    return state;
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${(navigation.state.params || {}).title || ''}`,
    headerRight: (
      <TouchableOpacity onPress={() => console.log('right clicked')}>
        <Image
          style={styles.headerRightIcon}
          source={Squares}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => {
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
      }}>
        <Image
          style={styles.headerLeftIcon}
          source={Hamburger}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.props.getAllProducts();
    this.state = {
      searchKeyword: '',
      customerName: '',
      customerPhoneNumber: '',
      isOpenCreateCustomerModal: false,
      loading: false,
      grid: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ handler: this.openModal });
  }

  openModal = () => {
    const selectedProducts = this.state.products.filter((item) => item.quantity && item.quantity > 0);
    if (!selectedProducts.length) {
      alert('Vui lòng chọn sản phẩm');
      return;
    } 
    if (!this.props.selectedCustomer) {
      this.setModalVisible(true);
    } else {
      this.props.updateOrderByCustomer({ customerId: this.props.selectedCustomer, items: selectedProducts });
      this.props.navigation.navigate('Checkout');
    }
  }
  
  closeModal = () => {
    this.setModalVisible(false);
  }

  keyExtractor = (item) => `${item.id}`;

  onChangeSearhKeyword = (keyword) => {
    this.setState({
      searchKeyword: keyword
    });
  }

  onChangeCustomerName = (text) => this.setState({ customerName: text });

  onChangeCustomerPhone = (text) => this.setState({ customerPhoneNumber: text });

  onItemPress(itemId) {
    console.log('on item pressed');
  }

  increaseBuyNumber = (index) => {
    const products = this.state.products;
    let item = products[index];
    item.quantity++;
    products[index] = item;
    this.setState({
      products
    });
  }

  decreaseBuyNumber = (index) => {
    const products = this.state.products;
    let item = products[index];
    item.quantity--;
    if (item.quantity < 0) {
      item.quantity = 0;
    }
    products[index] = item;
    this.setState({
      products
    });
  }

  setModalVisible = (isOpen) => {
    this.setState({isOpenCreateCustomerModal: isOpen});
  }

  handleCreateCustomer = async (params) => {
    const selectedProducts = this.state.products.filter((item) => item.quantity && item.quantity > 0);
    const result = await this.props.createCustomer(params.customerName, params.customerPhoneNumber);
    if (result.type === CREATE_CUSTOMER_SUCCESS) {
      this.closeModal();
      await this.props.createOrder(this.props.selectedCustomer, selectedProducts);
      this.props.navigation.navigate("Checkout");
    }
  }

  renderRow = ({item, index}) => {
    console.log('[Home.js] zz item', item);
    return (
      <ProductItem
        key={`product-${item.id}`}
        gridItem={this.state.grid}
        item={item}
        onItemPress={this.onItemPress}
        onIncrease={() => this.increaseBuyNumber(index)}
        onDecrease={() => this.decreaseBuyNumber(index)}
      />
    )
  }

  onRefresh = () => {
    this.props.getAllProducts();
  }

  render() {
    console.log('[Home.js] home nav', this.props)
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Tìm kiếm"
          value={this.state.searchKeyword}
          onChangeText={this.onChangeSearhKeyword}
        />
        <FlatList
          style={styles.list}
          data={this.state.products}
          numColumns={this.state.grid ? 2 : 1}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor} 
          ItemSeparatorComponent={Divider}
          columnWrapperStyle={this.state.grid ? styles.columnWrapperStyle : null}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.onRefresh}
            />
          }
        />
        <NewCustomerModal
          isOpen={this.state.isOpenCreateCustomerModal}
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

const Divider = () => (
  <View style={styles.divider} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 30,
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 30,
  },
  headerRightIcon: {
    marginRight: 15,
    width: 15,
    height: 15
  },
  headerLeftIcon: {
    marginLeft: 15,
    width: 20,
    height: 12
  },
  pageWrapper: {
    flex: 1
  },
  itemWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImage: {
    width: 100,
    height: 100
  },
  itemInformation: {
    paddingLeft: 15,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemCategory: {
    fontSize: 16,
    color: 'grey'
  },
  itemPrice: {
    flex: 1,
  },
  itemStatus: {
    color: 'green'
  },
  itemActionsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemAction: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchWrapper: {
    marginBottom: 15
  },
});

const mapStateToProps = state => {
  return {
    products: state.Product.products,
    selectedCustomer: state.Customer.selectedCustomer,
    orders: state.Order.list,
    customers: state.Customer.list,
    loading: state.Product.loading,
  }
};

const mapDispatchToProps = {
  getAllProducts,
  createCustomer,
  createOrder,
  updateOrderByCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
