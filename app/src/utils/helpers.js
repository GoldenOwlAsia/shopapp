import { Image, Alert } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { number, password, username, name } from './validator';

export function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) { }
};

export function preloadImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export function addObjectToArray(object, array, key) {
  return array.map(item => item[key] === object[key] ? object : item);
}

export const renderAlert = (title, message, onPressOK) => (
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress: onPressOK }],
    { cancelable: true }
  )
)

export const validateAddUserForm = (user) => {
  let messageValidate = null;
  let isValidate = false;
  if (name(user.fullName)) {
    return {
      messageValidate: 'Tên nhân viên không được chứa kí tự đặc biệt.\nVui lòng nhập lại!',
      isValidate: true
    }
  }

  if (username(user.username)) {
    return {
      messageValidate: 'Tên đăng nhập không được chứa kí tự đặc biệt.\nVui lòng nhập lại!',
      isValidate: true
    }
  }
  if (!password(user.password)) {
    return {
      messageValidate: 'Mật khẩu không được chứa khoảng trắng.\nVui lòng nhập lại!',
      isValidate: true
    }
  }
  if (!number(user.CMND)) {
    return {
      messageValidate: 'CMND chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }
  if (!number(user.phoneNumber)) {
    return {
      messageValidate: 'Số điện thoại chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }

  if (!number(user.salary)) {
    return {
      messageValidate: 'Lương chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }
  if (!number(user.bonus)) {
    return {
      messageValidate: 'Bonus chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }

  return {
    messageValidate,
    isValidate
  }
}

export const validateAddProductForm = (product) => {
  let messageValidate = null;
  let isValidate = false;

  if (!number(product.quantity)) {
    return {
      messageValidate: 'Số lượng chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }

  if (!number(product.importPrice)) {
    return {
      messageValidate: 'Giá nhập chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }
  if (!number(product.price)) {
    return {
      messageValidate: 'Giá bán chỉ chấp nhận số.\nVui lòng nhập lại!',
      isValidate: true
    }
  }

  if (product.images.length === 0) {
    return {
      messageValidate: 'Bạn chưa chọn hình ảnh cho sản phẩm.\nVui lòng chọn lại!',
      isValidate: true
    }
  }

  return {
    messageValidate,
    isValidate
  }
}
