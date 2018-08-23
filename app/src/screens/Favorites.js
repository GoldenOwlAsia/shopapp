import React, { Component } from "react";
import styled from "styled-components/native";

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// font-size: 30;
const TitleText = styled.Text`
  
  color: ${props => props.theme.WHITE};
`;

class FavoritesScreen extends Component {
  render() {
    return (
      <ContainerView>
        <TitleText>Favorites</TitleText>
      </ContainerView>
    );
  }
}

export default FavoritesScreen;
