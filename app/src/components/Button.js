import React, { Component } from "react";
import styled from "styled-components/native";
import { colors } from "../utils/constants";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    flexWrap: 'wrap'
  },
  btnText: {
    fontSize: 16,
    color: colors.WHITE,
    flex: 1
  },
  marginLeft15: {
    marginLeft: 15,
  },
  btnCenterText: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    marginLeft: 28
  },
  leftIcon: {
    width: 22,
    height: 22
  },
  rightIcon: {
    width: 28,
    height: 20
  },
});

class Button extends Component {
  render() {
    const { text, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn,
          this.props.btnStyle, 
          this.props.primary ? {backgroundColor: colors.BUTTON_PRIMARY_COLOR} : {}
        ]}
      >
        {
          !!this.props.leftIcon && <Image
            style={styles.leftIcon}
            source={this.props.leftIcon}
          />
        }
        <Text style={[styles.btnText, this.props.centerText ? styles.btnCenterText : styles.marginLeft15, this.props.textStyle]}>
          {text}
        </Text>
        {
          !!this.props.rightIcon && <Image
            style={styles.rightIcon}
            source={this.props.rightIcon}
          />
        }
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.required,
  leftIcon: PropTypes.oneOfType([
    PropTypes.string,
  ]),
  rightIcon: PropTypes.string,
  btnStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  onPress: PropTypes.func.required,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
}

export default Button;
