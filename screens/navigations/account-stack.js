import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/common/header";
import { useStore } from "../../store";
import ChangePasswordScreen from "../change-password-screen";
import LoginScreen from "../login-screen";
import ProfileScreen from "../profile-screen";
import RegisterScreen from "../register-screen";
import ReservationDetailsScreen from "../reservation-details-screen";
import ReservationsScreen from "../reservations-screen";

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  const { userState } = useStore();
  const { isUserLogin } = userState;

  return (
    <Stack.Navigator
      initialRouteName={isUserLogin ? "profile" : "login"}
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >

      {isUserLogin ? (
        <Stack.Group>
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
            }}
          />
          <Stack.Screen
            name="change-password"
            component={ChangePasswordScreen}
            options={{
              title: "Change Password",
            }}
          />
          <Stack.Screen
            name="reservations"
            component={ReservationsScreen}
            options={{
              title: "Reservations",
            }}
          />
          <Stack.Screen
            name="reservation-details"
            component={ReservationDetailsScreen}
            options={{
              title: "Details",
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{
              title: "Register",
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AccountStack;
