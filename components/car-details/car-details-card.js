import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useStore } from "../../store";
import { getVehicleImage } from "../../utils/functions/vehicle";
import { Card } from "react-native-paper";
import colors from "../../utils/constants/colors";

const CarDetailsCard = ({ carId }) => {
  const { vehiclesState } = useStore();
  const { vehicles } = vehiclesState;
  const [vehicle, setVehicle] = useState({});

  const getCar = () => {
    const arr = vehicles.filter((item) => item.id === carId);
    setVehicle(arr[0]);
  };

  useEffect(() => {
    getCar();
  }, []);


  return (
    <View style={styles.container}>
      <Image style={styles.carImage} source={getVehicleImage(vehicle?.image)} resizeMode="contain" />

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.carModel}>{vehicle?.model}</Text>
          <Text style={styles.carProps}>
            <Icon name="car-door" size={20} color={colors.color1}/> {vehicle?.doors} doors |{" "}
            <Icon name="car-seat" size={20} color={colors.color1} /> {vehicle?.seats} seats
          </Text>
          <Text style={styles.price}>${vehicle?.pricePerHour}/hour</Text>
          <View style={styles.carProps2}>
            <View style={styles.carPropItem}>
              <Icon name="car-shift-pattern" size={50} color={colors.color1} />
              <Text>{vehicle?.transmission}</Text>
            </View>
            {vehicle?.airConditioning && (
              <View style={styles.carPropItem}>
                <Icon name="snowflake"  size={50} color={colors.color1} />
                <Text>Air Con</Text>
              </View>
            )}

            <View style={styles.carPropItem}>
              <Icon name="gas-station"  size={50} color={colors.color1} />
              <Text>{vehicle?.fuelType}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CarDetailsCard;

const styles = StyleSheet.create({
  container: {
    
  },
  carImage: {
    width: "100%",
    height: 200,
    position: "absolute",
    alignSelf: 'center',
    zIndex:1,
  },
  card: {
    paddingTop: 80,
    marginTop:100
  },
  cardContent:{
    alignItems:"center"
  },
  carModel:{
    fontSize:20,
    fontWeight:"bold"
  },
  carProps:{
    color: colors.color6
  },
  price:{
    fontSize:25,
    backgroundColor: colors.color4,
    padding:10,
    borderRadius: 30,
    width:"100%",
    textAlign:"center",
    marginVertical: 25
  },
  carProps2:{
    width:"100%",
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  carPropItem:{
   
  }
});
