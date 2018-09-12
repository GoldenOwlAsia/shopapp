import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
} from 'react-native';

import {
  Squares,
  Hamburger
} from '../components/imageUrls';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import NewCustomerModal from '../components/NewCustomerModal';

import { getAllProducts } from '../actions/product';
import { createCustomer } from '../actions/customer';
import { createOrder } from '../actions/order';
import { colors } from "../utils/constants";
import { CREATE_CUSTOMER_SUCCESS } from "../actions/types";

class HomeScreen extends Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  static getDerivedStateFromProps= (props, state) => {
    state.products = props.products.map((item) => ({ ...item, quantity: 0}));
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
      this.props.navigation.navigate("Checkout");
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
      this.props.createOrder(this.props.selectedCustomer, selectedProducts);
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
            <TouchableHighlight onPress={() => this.decreaseBuyNumber(index)} style={styles.itemAction}>
              <Text>-</Text>
            </TouchableHighlight>
            <View style={styles.itemAction}>
              <Text>{item.quantity}</Text>
            </View>
            <TouchableHighlight onPress={() => this.increaseBuyNumber(index)} style={styles.itemAction}>
              <Text>+</Text>
            </TouchableHighlight>
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
        {/* <Modal
          animationType="slide"
          visible={this.state.isOpenCreateCustomerModal}
          transparent={true}
          onRequestClose={this.closeModal}>
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
                    onPress={this.handleCreateCustomer}
                  />
                  <Button
                    text="No, do it later"
                    centerText
                    textStyle={{color: 'black'}}
                    onPress={this.closeModal}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
        <NewCustomerModal
          isOpen={this.state.isOpenCreateCustomerModal}
          onSubmit={this.handleCreateCustomer}
          onRequestClose={this.closeModal}
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
  // modalContainer: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
  //   backgroundColor: '#00000063',
  //   height: '100%'
  // },
  // contentContainer: {
  //   backgroundColor: colors.WHITE,
  //   height: 320,
  //   width: '100%',
  //   borderTopLeftRadius: 25,
  //   borderTopRightRadius: 25,
  //   justifyContent: 'center',
  //   flexDirection: 'column'
  // },
  // modalTitle: {
  //   borderBottomWidth: 1,
  //   flexDirection: 'column',
  //   borderBottomColor: 'black',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: 70
  // },
  // modalTitleText: {
  //   fontWeight: 'bold',
  //   fontSize: 18,
  //   marginTop: 15
  // },
  // createCustomerForm: {
  //   flexDirection: 'column',
  //   flexWrap: 'wrap',
  //   paddingLeft: 20,
  //   paddingRight: 20
  // },
  // textInput: {
  //   marginTop: 20,
  //   height: 50
  // },
  // buttonsWrapper: {
  //   marginTop: 20,
  //   marginBottom: 20,
  //   flexWrap: 'wrap'
  // }
});

const mapStateToProps = state => {
  return {
    products: state.Product.products,
    selectedCustomer: state.Customer.selectedCustomer,
  }
};

const mapDispatchToProps = {
  getAllProducts,
  createCustomer,
  createOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
