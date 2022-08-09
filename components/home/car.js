import { StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph, Button, IconButton } from "react-native-paper";
import React from "react";
import { getVehicleImage } from "../../utils/functions/vehicle";
import colors from "../../utils/constants/colors";

const Car = ({ data }) => {
  const { model, pricePerHour, image } = data;
  const vehicleImage = getVehicleImage(image[0]);

  return (
    <Card style={styles.card}>
      <Card.Cover source={vehicleImage} />
      <Card.Content style={styles.content}>
        <View>
          <Title style={styles.title}>{model}</Title>
          <Paragraph style={styles.paragraph}>
            from ${pricePerHour}/hour{" "}
          </Paragraph>
        </View>
        <IconButton
          icon="chevron-right"
          color="white"
          size={30}
          style={styles.button}
          onPress={() => console.log("Pressed")}
        />
      </Card.Content>
    </Card>
  );
};

export default Car;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    
  },
  card: {
    marginVertical:20
  },
  paragraph: {
    color: colors.color3,
  },
  button:{
    backgroundColor: colors.color1,
  },
  title:{
    overflow: "hidden",
  }
});
