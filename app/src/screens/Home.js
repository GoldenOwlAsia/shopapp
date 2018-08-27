import React, { Component } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  Screen,
  ListView,
  View,
  Tile,
  ImageBackground,
  Title,
  Subtitle,
  Divider,
  Text,
  Row,
  Icon,
  Button
} from "@shoutem/ui";
import { graphql } from "react-apollo";
import { GetAllProducts } from "../lib/queries";

class HomeScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allShops: PropTypes.array,
      products: PropTypes.array,
    }).isRequired
  };

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  onShopPress(shop) {
    this.props.navigation.navigate("Map", { shop });
  }

  renderRow(shop) {
    return (
      <Row styleName="small">
        <Icon name="home" />
        <Button onPress={this.onShopPress.bind(this, shop)}>
          <Text>{shop.name}</Text>
        </Button>
      </Row>
    );
  }

  render() {
    console.log('home render')
    if (this.props.data.loading) {
      console.log("Is loading!");
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    if (this.props.data.error) {
      console.log('error!');
      return (
        <View>
          <Text>An unexpected error occurred</Text>
        </View>
      );
    }

    // const shops = this.props.data.allShops;
    const products = [...this.props.data.products, ...this.props.data.products, ...this.props.data.products];

    return (
      <Screen>
        <ListView data={products} renderRow={this.renderRow} />
      </Screen>
    );
  }
}

export default graphql(GetAllProducts)(HomeScreen);
