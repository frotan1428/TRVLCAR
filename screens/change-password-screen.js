import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileCard from "../components/account/profile-card";

const ChangePasswordScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileCard />
      <Text>Change Password</Text>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container:{
    padding:10
  }
})