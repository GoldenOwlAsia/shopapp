import React, { Component } from "react";
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

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 30px;
  color: ${colors.WHITE};
`;

const ButtonContainer = styled.View`
  top: 100px;
`;

class ProfileScreen extends Component {
  render() {
    return (
      <ContainerView>
        <TitleText>Profile</TitleText>
        <ButtonContainer>
          <Button onPress={() => this.props.navigation.navigate("Scan")}>
            <Text>Scan QR code</Text>
          </Button>
        </ButtonContainer>
      </ContainerView>
    );
  }
}

export default ProfileScreen;
