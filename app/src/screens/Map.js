import React, { Component } from "react";
import styled from "styled-components/native";
import { colors } from "../utils/constants";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import PropTypes from "prop-types";
import { MapView } from "expo";
import { ShopQuery } from "../lib/queries";
import { graphql } from "react-apollo";

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 30px;
  color: ${colors.WHITE};
`;

class MapScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allShops: PropTypes.array
    }).isRequired
  };

  constructor(props) {
    super(props);

    const { coords, selectedId } = this.extractDataFromNav(props.navigation);
    this.state = {
      coords,
      errorMessage: null,
      selectedId
    };

    this.markers = {};
  }

  extractDataFromNav(navigation) {
    const { params } = this.props.navigation.state;
    const coords =
      params && params.shop
        ? { latitude: params.shop.latitude, longitude: params.shop.longitude }
        : {
            latitude: 1.3096036,
            longitude: 103.8536703
          };
    const selectedId = params && params.shop ? params.shop.id : null;
    return {
      coords,
      selectedId
    };
  }

  componentWillReceiveProps(props) {
    const { coords, selectedId } = this.extractDataFromNav(props.navigation);
    this.setState({
      coords,
      selectedId
    });
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _getNearbyShops(shops) {
    if (shops && shops.length > 0) {
      return shops.map(x => {
        return {
          ...x,
          latlng: {
            latitude: x.latitude,
            longitude: x.longitude
          }
        };
      });
    }

    return [];
  }

  onMarkerPress(shop) {
    this.props.navigation.navigate("Shop", { shop });
  }

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.coords) {
      const { coords, selectedId } = this.state;
      const nearby = this._getNearbyShops(this.props.data.allShops);
      return (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0112,
            longitudeDelta: 0.0111
          }}
          showsUserLocation
          onRegionChangeComplete={() => {
            if (selectedId) {
              this.markers[`${selectedId}`].showCallout();
            }
          }}
        >
          {nearby.map((shop, i) => (
            <MapView.Marker
              ref={ref => (this.markers[`${shop.id}`] = ref)}
              key={i}
              coordinate={shop.latlng}
              title={shop.name}
              description={shop.name}
            />
          ))}
        </MapView>
      );
    }

    return (
      <ContainerView>
        <TitleText>{text}</TitleText>
      </ContainerView>
    );
  }
}

export default graphql(ShopQuery)(MapScreen);
