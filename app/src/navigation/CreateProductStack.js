import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import CreateProductScreen from '../screens/CreateProduct';

const CreateProductStack = createStackNavigator({
  CreateProduct: CreateProductScreen,
});

export default CreateProductStack;