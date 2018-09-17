import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Squares,
  Hamburger
} from '../components/imageUrls';
import TextInput from '../components/TextInput';
import NewCustomerModal from '../components/NewCustomerModal';

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
    title: `${(navigation.state.params || {}).title || 'Product list'}`,
    headerRight: (
      <TouchableOpacity onPress={() => console.log('right clicked')}>
        <Image
          style={styles.headerRightIcon}
          source={Squares}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => console.log('left clicked')}>
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
      isOpenCreateCustomerModal: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ handler: this.openModal });
  }

  openModal = () => {
    const selectedProducts = this.state.products.filter((item) => item.quantity && item.quantity > 0);
    if (!selectedProducts.length) {
      alert('Please select products');
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

  _keyExtractor = (item, index) => item.id

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
    return (
      <TouchableOpacity key={index} onPress={this.onItemPress} style={styles.itemWrapper}>
        <Image
          style={styles.itemImage}
          source={{uri: item.image}}
        />
        <View style={styles.itemInformation}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemPrice}>{item.price} VND</Text>
            <Text style={styles.itemStatus}>{item.status}</Text>
          </View>
          <View style={styles.itemActionsWrapper}>
            <TouchableOpacity onPress={() => this.decreaseBuyNumber(index)} style={styles.itemAction}>
              <Text>-</Text>
            </TouchableOpacity>
            <View style={styles.itemAction}>
              <Text>{item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => this.increaseBuyNumber(index)} style={styles.itemAction}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.pageWrapper}>
        <View style={[styles.searchWrapper, styles.container]}>
          <TextInput
            wrapperStyle={{marginTop: 15}}
            placeholder="Search"
            value={this.state.searchKeyword}
            onChangeText={this.onChangeSearhKeyword}
          />
        </View>
        <FlatList contentContainerStyle={{paddingLeft: 15, paddingRight: 15}} data={this.state.products} renderItem={this.renderRow} keyExtractor={this._keyExtractor}/>
        <NewCustomerModal
          isOpen={this.state.isOpenCreateCustomerModal}
          onSubmit={this.handleCreateCustomer}
          onRequestClose={this.closeModal}
          submitText={'Create new customer'}
          cancleText={'No, do it later'}
          title={'New customer'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    paddingLeft: 15,
    paddingRight: 15
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
  }
};

const mapDispatchToProps = {
  getAllProducts,
  createCustomer,
  createOrder,
  updateOrderByCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
