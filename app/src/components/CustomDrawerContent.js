import React from "react";
import { Alert, AsyncStorage, Image, View, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { DrawerItems } from "react-navigation";
import BaseButton from '../components/BaseButton';
import { Logout } from '../components/imageUrls';
import { AvatarHolder } from '../components/imageUrls';

const styles = StyleSheet.create({
  ContainerView: {
    flex: 1
  },
  DrawerContainer: {
    flex: 8
  },
  AvatarContainer: {
    flex: 4,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  ButtonContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const RightIcon = () => (
  <Image resizeMode="contain" source={Logout} style={{width: 25, height: 25}} />
)

const CustomDrawerContent = props => (
  <View style={styles.ContainerView}>
    <View style={styles.DrawerContainer}>
      <View style={styles.AvatarContainer}>
        <Image source={AvatarHolder} style={styles.Avatar} />
      </View>
    </View>
    <View style={styles.ButtonContainer}>
    <View style={{width: 200}}>
      <BaseButton
        onPress={() => {
          Alert.alert(
            'Xác Nhận',
            'Bạn có thật sự muốn đăng xuất ?',
            [
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'OK', onPress: async () => {
                await AsyncStorage.clear();

                props.navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'AuthLoading' })],
                  key: null,
                }));

              }},
            ],
            { cancelable: false }
          )
        }}
        IconRight={<RightIcon />}
        fullWidth title="Đăng xuất" />
      </View>
    </View>
  </View>
);

export default CustomDrawerContent;
