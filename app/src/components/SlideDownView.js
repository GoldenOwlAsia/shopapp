import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

class SlideDownView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    let isOpen = this.state.isOpen;
    this.setState({
      isOpen: !isOpen
    });
  }

  startAnimate = () => {
    
  }

  render() {
    const styles = StyleSheet.create({
      wrapper: {
        display: this.state.isOpen ? 'flex' : 'none'
      }
    })
    return (
      <Animated.View                 
        style={[
          this.props.style,
          styles.wrapper
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default SlideDownView;