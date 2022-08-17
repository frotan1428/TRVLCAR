import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Card, Title, Paragraph, Button, IconButton } from "react-native-paper";
import React from "react";
import { getVehicleImage } from "../../utils/functions/vehicle";
import colors from "../../utils/constants/colors";
import { useNavigation } from "@react-navigation/native";

const Car = ({ data }) => {
  const { model, pricePerHour, image, id } = data;
  const vehicleImage = getVehicleImage(image[0]);
  const navigation = useNavigation();

  const goDetails = () => {
    navigation.navigate("car-details", { carId: id });
  };

  return (
    <TouchableWithoutFeedback onPress={(goDetails)}>
      <Card style={styles.card}>
        <Card.Cover source={vehicleImage} resizeMode="contain" style={{backgroundColor: "white"}} />
        <Card.Content style={styles.content}>
          <View>
            <Title style={styles.title}>{model}</Title>
            <Paragraph style={styles.paragraph}>
              from ${pricePerHour}/hour
            </Paragraph>
          </View>
          <IconButton
            icon="chevron-right"
            color="white"
            size={30}
            style={styles.button}
            onPress={goDetails}
          />
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default Car;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  card: {
    marginVertical: 20,
    
  },
  paragraph: {
    color: colors.color3,
  },
  button: {
    backgroundColor: colors.color1,
  },
  title: {
    overflow: "hidden",
  },

});
