import { StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import React from "react";
import { getVehicleImage } from "../../utils/functions/vehicle";

const Car = ({ data }) => {
    
  const { model, pricePerHour, image } = data;
  const vehicleImage = getVehicleImage(image[0]);
  console.log(vehicleImage);

  return (
    <Card style={styles.card}>
      <Card.Cover
        style={styles.cover}
        source={vehicleImage}
      />
      <Card.Content style={styles.content}>
        <View>
          <Title>{model}</Title>
          <Paragraph>from ${pricePerHour}/hour </Paragraph>
        </View>
        <Button>Ok</Button>
      </Card.Content>
    </Card>
  );
};

export default Car;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 30,
  },
});
