import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePasswordScreen from '../change-password-screen';
import LoginScreen from '../login-screen';
import ProfileScreen from '../profile-screen';
import RegisterScreen from '../register-screen';
import ReservationDetailsScreen from '../reservation-details-screen';
import ReservationsScreen from '../reservations-screen';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="change-password" component={ChangePasswordScreen} />
      <Stack.Screen name="reservations" component={ReservationsScreen} />
      <Stack.Screen name="reservation-details" component={ReservationDetailsScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default AccountStack