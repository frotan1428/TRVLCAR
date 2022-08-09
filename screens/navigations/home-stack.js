import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/common/header';
import CarDetailsScreen from '../car-details-screen';
import CarsScreen from '../cars-screen';
import ReservationResultScreen from '../reservation-result-screen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      header: (props)=> <Header {...props} />
    }}>
      <Stack.Screen name="cars" component={CarsScreen} options={{
        title: "TRVL Cars"
      }} />
      <Stack.Screen name="car-details" component={CarDetailsScreen}  options={{
        title: "Car Details"
      }} />
      <Stack.Screen name="reservation-result" component={ReservationResultScreen}  options={{
        title: "Result"
      }} />
    </Stack.Navigator>
  );
}

export default HomeStack