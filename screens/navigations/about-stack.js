import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../about-screen';

const Stack = createNativeStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="about" component={AboutScreen}  options={{
        title: "About Us"
      }}/>
    </Stack.Navigator>
  );
}

export default AboutStack