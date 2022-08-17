import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Title, Button } from "react-native-paper";
import { CommonActions, StackActions } from "@react-navigation/native";
import colors from "../utils/constants/colors";

const ReservationResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon="check-decagram" style={styles.avatar} />
      <Title style={styles.title}>Congratulations!</Title>
      <Text style={styles.text}>
        Your reservation just created successfully. You can check it in account
        page
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("reservations");
        }}
        style={styles.primaryButton}
      >
        Go Reservations
      </Button>

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("cars");
        }}
        style={styles.secondaryButton}
        labelStyle={styles.secondaryButtonLabel}
      >
        Go Home
      </Button>
    </View>
  );
};

export default ReservationResultScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  avatar: {
    marginVertical: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
  },
  text: {
    marginBottom: 50,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  primaryButton: {
    marginTop: 30,
  },
  secondaryButton: {
    marginTop: 30,
    backgroundColor: colors.color6,
  },
  secondaryButtonLabel: {
    color: "white",
  },
});
