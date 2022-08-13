import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "../../store";
import {
  Card,
  Button,
  Avatar,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import colors from "../../utils/constants/colors";

const ProfileCard = () => {
  const { userState, dispatchUser } = useStore();
  const { user } = userState;
  const navigation = useNavigation();

  const handleLogout = () => { 

    /*
        1. Alert.alert ile emin misiniz diye sorulacak
        2. dispatch ile logout yap
        3. Secure store u boşalt
        4. navigate to home
    */

   }



  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <Avatar.Icon size={120} icon="account-circle" />
        <Title>
          {user.firstName} {user.lastName}
        </Title>
        <Paragraph>{user.email}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="outlined" onPress={() => navigation.navigate("profile")}>
          Profile
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("change-password")}
        >
          Password
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("reservations")}
        >
          Reservations
        </Button>
      </Card.Actions>

      <IconButton
        icon="logout-variant"
        iconColor="red"
        size={30}
        style={styles.logout}
        onPress={handleLogout}
      />
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center",
  },
  actions: {
    justifyContent: "space-between",
  },
  logout: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: colors.color5
  },
});
