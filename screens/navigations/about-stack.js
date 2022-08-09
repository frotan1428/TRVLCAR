import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/common/header';
import AboutScreen from '../about-screen';

const Stack = createNativeStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      header: (props)=> <Header {...props}/>
    }}>
      <Stack.Screen name="about" component={AboutScreen}  options={{
        title: "About Us"
      }}/>
    </Stack.Navigator>
  );
}

export default AboutStack