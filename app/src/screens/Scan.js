import React, { Component } from "react";
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../utils/constants";
import {
  Button,
  Title,
  ListView,
  View,
  Tile,
  ImageBackground,
  Subtitle,
  Divider,
  Text,
  Row,
  Icon
} from "@shoutem/ui";
import { BarCodeScanner, Permissions } from "expo";

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: row;
`;

// const Url = styled(Button)`
//   flex: 1;
// `;

// const UrlText = styled(Text)`
//   color: #fff;
//   font-size: 20;
// `;
// const CancelButton = styled(Button)`
//   margin-left: 10,
//   align-items: center;
//   justify-content: center;
// `;
// const CancelButtonText = styled(Text)`
//   color: rgba(255, 255, 255, 0.8);
//   font-size: 18;
// `;

export default class ScanScreen extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  _handlePressUrl = () => {
    Alert.alert(
      "Open this URL?",
      this.state.lastScannedUrl,
      [
        {
          text: "Yes",
          onPress: () => Linking.openURL(this.state.lastScannedUrl)
        },
        { text: "No", onPress: () => {} }
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  maybeRenderUrl() {
    if (!this.state.lastScannedUrl) {
      return null;
    }

    return (
      <BottomBar>
        <Button onPress={this._handlePressUrl}>
          <Text numberOfLines={1}>{this.state.lastScannedUrl}</Text>
        </Button>
        <Button onPress={this._handlePressCancel}>
          <Text>Cancel</Text>
        </Button>
      </BottomBar>
    );
  }

  render() {
    return (
      <ContainerView>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }}
          />
        )}

        {this.maybeRenderUrl()}
        <StatusBar hidden />
      </ContainerView>
    );
  }
}
