import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./home-stack";
import AboutStack from "./about-stack";
import AccountStack from "./account-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home-stack" component={HomeStack} />
        <Tab.Screen name="about-stack" component={AboutStack} />
        <Tab.Screen name="account-stack" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
