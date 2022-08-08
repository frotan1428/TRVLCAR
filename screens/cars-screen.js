import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "../store";
import Car from "../components/home/car";

const CarsScreen = () => {
  const { vehiclesState } = useStore();
  const {vehicles} = vehiclesState;

  return (
    <View style={styles.container}>
      {vehicles.map(item=> <Car data={item} key={item.id}/>)}
      
    </View>
  );
};

export default CarsScreen;

const styles = StyleSheet.create({
  container:{
    padding:20
  }
});
