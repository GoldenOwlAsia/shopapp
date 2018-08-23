import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { FormattedWrapper, FormattedMessage } from "react-native-globalize";

import { changeLanguage } from "../actions";
import { Button } from "../components";
import messages from "../Messages";
import { colors } from "../utils/constants";

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// font-size: 30;
const TitleText = styled.Text`
  
  color: ${colors.WHITE};
`;

class SettingsScreen extends Component {
  render() {
    return (
      <FormattedWrapper
        locale={this.props.curState.Language.language}
        messages={messages}
      >
        <ContainerView>
          <TitleText>
            <FormattedMessage message="Settings" />
          </TitleText>
          <Button
            text="Change language to es"
            onPress={() => {
              this.props.changeLanguage("es");
            }}
          />
        </ContainerView>
      </FormattedWrapper>
    );
  }
}

const mapStateToProps = state => ({
  curState: state
});

export default connect(mapStateToProps, {
  changeLanguage
})(SettingsScreen);
