import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { FormattedProvider, FormattedMessage } from "react-native-globalize";
import {
  Button,
  Title,
  View,
  Tile,
  ImageBackground,
  Subtitle,
  Divider,
  Text,
  Row,
  Icon
} from "@shoutem/ui";
import messages from "../Messages";
import { colors } from "../utils/constants";

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.WHITE};
`;

const ButtonContainer = styled.View`
  top: 100;
`;
class WelcomeScreen extends Component {
  render() {
    return (
      <FormattedProvider
        locale={this.props.curState.Language.language}
        messages={messages}
      >
        <ContainerView>
          <Title>
            <FormattedMessage message="Welcome" />
          </Title>
          <ButtonContainer>
            <Button onPress={() => this.props.navigation.navigate("Main")}>
              <Text> Go to main </Text>
            </Button>
          </ButtonContainer>
        </ContainerView>
      </FormattedProvider>
    );
  }
}

const mapStateToProps = state => ({
  curState: state
});

export default connect(mapStateToProps, {})(WelcomeScreen);
