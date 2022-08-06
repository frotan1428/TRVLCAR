import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarDetailsScreen from '../car-details-screen';
import CarsScreen from '../cars-screen';
import ReservationResultScreen from '../reservation-result-screen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="cars" component={CarsScreen} />
      <Stack.Screen name="car-details" component={CarDetailsScreen} />
      <Stack.Screen name="reservation-result" component={ReservationResultScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack