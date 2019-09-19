import { createStackNavigator } from 'react-navigation-stack'

import NotificationScreen from '../screens/OwnerNotification';

const OwnerNotificationStack = createStackNavigator({
  OwnerNotification: NotificationScreen,
});

export default OwnerNotificationStack;