import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarDetailsCard from '../components/car-details/car-details-card';
import ReservationForm from '../components/car-details/reservation-form';
import PaymentForm from '../components/car-details/payment-form';

const CarDetailsScreen = ({route}) => {
  const {carId} = route.params;

  return (
    <ScrollView style={styles.container}>
      <CarDetailsCard carId={carId}/>
      <ReservationForm/>
      <PaymentForm/>
    </ScrollView>
  )
}

export default CarDetailsScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
  }
})