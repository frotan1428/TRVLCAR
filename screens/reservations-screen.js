import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCard from '../components/account/profile-card'

const ReservationsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileCard />
      <Text>Reservations</Text>
    </ScrollView>
  )
}

export default ReservationsScreen

const styles = StyleSheet.create({
  container:{
    padding:10
  }
})