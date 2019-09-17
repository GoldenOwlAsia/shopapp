import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Provider, connect } from "react-redux";
import { compose } from 'redux';
// import { Font } from "expo";
import styled from "styled-components/native";
import { FormattedProvider } from "react-native-globalize";
import client from './lib/client';
import { ApolloProvider } from "react-apollo";

import messages from "./Messages";
import configureStore from "./store";

import Navigator from "./navigation";
import withLoading from './services/withLoading';
import { colors } from "./utils/constants";
import { preloadImages, cacheFonts } from './utils/helpers';
import * as images from '../assets/images';

const LoadingView = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.Text`
  color: black;
`;

const Root = styled.View`
  flex: 1;
  background-color: ${colors.BLUE_50};
`;

class RootContainer extends Component {

  render() {
    return (
      <FormattedProvider
        locale={this.props.state.Language.language}
        messages={messages}
      >
        <Root>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Navigator />
        </Root>
      </FormattedProvider>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const ConnectedRootContainer = compose(
  connect(mapStateToProps, null),
  withLoading(),
)(RootContainer)


const store = configureStore();
class App extends Component {

  state = {
    ready: false
  };

  async componentDidMount() {
    const imageAssets = preloadImages(Object.values(images));
    const fontAssets = cacheFonts([
      { "Rubik-Black": require("../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf") },
      { "Rubik-BlackItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf") },
      { "Rubik-Bold": require("../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf") },
      { "Rubik-BoldItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf") },
      { "Rubik-Italic": require("../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf") },
      { "Rubik-Light": require("../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf") },
      { "Rubik-LightItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf") },
      { "Rubik-Medium": require("../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf") },
      { "Rubik-MediumItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf") },
      { "Rubik-Regular": require("../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf") },
      { "rubicon-icon-font": require("../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf") }
    ]);
    await Promise.all([...imageAssets, ...fontAssets]);
    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return (
        <LoadingView>
          <LoadingText>App loading...</LoadingText>
        </LoadingView>
      );
    }
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRootContainer />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
