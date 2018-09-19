import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Button from '../components/BaseButton';
import { MaterialIcons } from "@expo/vector-icons";
import { BackArrow } from '../components/imageUrls';

const STATUS_SIZE = 6;
const URL = 'https://i.ytimg.com/vi/SJrb_d7W9Ww/maxresdefault.jpg';

const BasicInfo = ({ isOnline, avatarUrl, name, phone, address, onCall, onEdit }) => (
  <View style={basicInfostyles.container}>
    <Image style={basicInfostyles.avatar} source={{ uri: avatarUrl }} resizeMode="cover" />
    <View style={basicInfostyles.content}>
      <View style={basicInfostyles.nameWrapper}>
        <Text style={basicInfostyles.name}>{name}</Text>
        <View style={[basicInfostyles.status, isOnline ? basicInfostyles.online : basicInfostyles.offline]} />
      </View>
      <Text style={[basicInfostyles.regularText, basicInfostyles.topSpacing]}>{phone}</Text>
      <View style={[basicInfostyles.nameWrapper, basicInfostyles.topSpacing]}>
        <MaterialIcons style={basicInfostyles.icon} name="location-on" />
        <Text style={basicInfostyles.regularText}>{address}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <Button
          title={'Gọi điện'}
          fullWidth={false}
          buttonStyle={basicInfostyles.buttonStyle}
          onPress={onCall}
        />
        <Button
          title={'Chỉnh sửa'}
          fullWidth={false}
          outline
          buttonStyle={[basicInfostyles.buttonStyle, basicInfostyles.btnEdit]}
          onPress={onEdit}
        />
      </View>
    </View>
  </View>
)

const basicInfostyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 114,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  avatar: {
    width: 90,
    height: '100%',
    borderRadius: 4,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Rubik-Medium',
    lineHeight: 22,
    color: '#12283F',
  },
  status: {
    width: STATUS_SIZE,
    height: STATUS_SIZE,
    borderRadius: STATUS_SIZE/2,
    marginLeft: 6,
  },
  online: {
    backgroundColor: '#87DB8B'
  },
  offline: {
    backgroundColor: 'grey', //TODO update later
  },
  topSpacing: {
    marginTop: 4,
  },
  regularText: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    lineHeight: 19,
    color: '#A8A8A8',
  },
  icon: {
    color: '#5175FF',
    marginRight: 10,
    fontSize: 16,
  },
  buttonStyle: {
    height: 'auto',
    minWidth: 76,
    justifyContent: 'center',
  },
  btnEdit: {
    marginLeft: 10,
  },
});

class StaffDetailScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{ width: 24, height: 16, marginLeft: 16 }}
          source={BackArrow}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <BasicInfo avatarUrl={URL} isOnline name="Đinh Văn Lộc" phone="0908789223" address="40E Ngô Đức Kế" />
        <View style={styles.statistic}>
          <View>
            <Text style={styles.statisticItemValue}>23.06.18</Text>
            <Text style={styles.statisticItemLabel}>Ngày bắt đầu</Text>
          </View>
          <View>
            <Text style={styles.statisticItemValue}>48</Text>
            <Text style={styles.statisticItemLabel}>Sản phẩm bán được</Text>
          </View>
          <View>
            <Text style={styles.statisticItemValue}>88,2M</Text>
            <Text style={styles.statisticItemLabel}>Số tiền thu về</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.desTitle}>Mô tả</Text>
          <Text style={styles.desText}>Lorem ipsum dolor sit amet, eu tota zril nec, ad has zril eirmod. Eum eu alia dolores eligendi, eligendi expetendis vis in, duis posidonium.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    color: '#12283F',
    fontFamily: 'Rubik-Medium',
    fontWeight: '700',
    lineHeight: 32,
    margin: 24,
  },
  statistic: {
    marginTop: 30,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    backgroundColor: '#DADADC',
    justifyContent: 'space-around',
  },
  statisticItemLabel: {
    fontSize: 14,
    color: '#A8A8A8',
    fontFamily: 'Rubik-Regular',
    lineHeight: 19,
  },
  statisticItemValue: {
    fontSize: 16,
    color: '#12283F',
    fontFamily: 'Rubik-Medium',
    fontWeight: '700',
    lineHeight: 22,
  },
  description: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
  },
  desTitle: {
    fontSize: 14,
    color: '#12283F',
    fontFamily: 'Rubik-Medium',
    fontWeight: '700',
    lineHeight: 19,
  },
  desText: {
    fontSize: 16,
    color: '#A8A8A8',
    fontFamily: 'Rubik-Regular',
    lineHeight: 19,
  }
});

export default StaffDetailScreen;