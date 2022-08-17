import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CarDetailsCard from "../components/car-details/car-details-card";
import ReservationForm from "../components/car-details/reservation-form";
import PaymentForm from "../components/car-details/payment-form";
import Spacer from "../components/common/spacer";

const CarDetailsScreen = ({ route }) => {
  const { carId } = route.params;
  const [activeScreen, setActiveScreen] = useState("reservation");

  return (
    <ScrollView style={styles.container}>
      <CarDetailsCard carId={carId} />
      <Spacer />
      {activeScreen === "reservation" ? (
        <ReservationForm carId={carId} setActiveScreen={setActiveScreen}/>
      ) : (
        <PaymentForm setActiveScreen={setActiveScreen}/>
      )}
    </ScrollView>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
