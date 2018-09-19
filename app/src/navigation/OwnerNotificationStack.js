import {
  createStackNavigator
} from 'react-navigation';
import NotificationScreen from '../screens/OwnerNotification';

const OwnerNotificationStack = createStackNavigator({
  OwnerNotification: NotificationScreen,
});

export default OwnerNotificationStack;