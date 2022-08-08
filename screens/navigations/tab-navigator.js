import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./home-stack";
import AboutStack from "./about-stack";
import AccountStack from "./account-stack";
import { NavigationContainer } from "@react-navigation/native";
import FIcon from "@expo/vector-icons/Feather";
import colors from "../../utils/constants/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="home-stack" screenOptions={{
        tabBarActiveTintColor: colors.color1,
        headerShown: false
      }}>
        <Tab.Screen name="home-stack" component={HomeStack} options={{
          tabBarLabel:"Home",
          tabBarIcon: ()=> <FIcon name="home" size={25} color={colors.color1} />
        }} />
        <Tab.Screen name="about-stack" component={AboutStack}  options={{
          tabBarLabel:"About",
          tabBarIcon: ()=> <FIcon name="info" size={25} color={colors.color1} />
        }} />
        <Tab.Screen name="account-stack" component={AccountStack}  options={{
          tabBarLabel:"Account",
          tabBarIcon: ()=> <FIcon name="user" size={25} color={colors.color1} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
