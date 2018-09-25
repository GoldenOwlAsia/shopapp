import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { StyleSheet } from 'react-native';

import { colors } from "../utils/constants";
import * as imageUrls from '../components/imageUrls';

import AuthHeader from '../components/AuthHeader';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1
  },
  contentWrapper: {
    flex: 1
  },
  description: {
    fontSize: 14,
    color: '#868686',
    marginTop: 50
  },
  whiteColor: {
    color: colors.WHITE
  },
  icon: {
    width: 22,
    height: 22
  },
  arrow: {
    width: 28,
    height: 20
  },
  btn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    flexWrap: 'wrap'
  },
  btnShopOwner: {
    marginBottom: 15,
    marginTop: 15,
  },
  btnText: {
    marginLeft: 15,
    flex: 1
  },
  btnStaff: {
    backgroundColor: '#3E4A89',
  }
});

class ChooseUserScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  chooseShopOwner = () => {
    this.props.navigation.navigate('OnwerLogin');
  }

  chooseStaff = () => {
    this.props.navigation.navigate('SignIn')
  }

  render() {
    return (
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.contentWrapper}>
          <Text style={{fontWeight: 'bold'}}>Xin chào, bạn là</Text>
          <Button
            primary
            text="Chủ shop"
            btnStyle={styles.btnShopOwner}
            leftIcon={imageUrls.OwnerIcon}
            rightIcon={imageUrls.ArrowIcon}
            onPress={this.chooseShopOwner}
          />
          <Button
            text="Nhân viên"
            btnStyle={styles.btnStaff}
            leftIcon={imageUrls.StaffIcon}
            rightIcon={imageUrls.ArrowIcon}
            onPress={this.chooseStaff}
          />
          <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At auctor urna nunc id cursus metus.</Text>
        </View>
      </View>
    )
  }
}

export default ChooseUserScreen;