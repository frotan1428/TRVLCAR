import { Alert, StyleSheet, Text, View } from "react-native";
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
import { logout } from "../../store/user/userActions";
import * as SecureStore from "expo-secure-store";

const ProfileCard = () => {
  const { userState, dispatchUser } = useStore();
  const { user } = userState;
  const navigation = useNavigation();

  const handleLogout =  () => {
    Alert.alert("Warning", "Are you sure want to log out?", [
      {
        text:"NO"
      },{
        text:"YES",
        onPress: async ()=>{
          dispatchUser(logout());
          await SecureStore.deleteItemAsync("token");
          navigation.navigate("cars");
        }
      }
    ])
  };

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
    backgroundColor: colors.color5,
  },
});
