import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../about-Screen';


const Stack = createNativeStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="about" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default AboutStack