import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCard from '../components/account/profile-card'

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileCard/>
      <Text>Profile</Text>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    padding:10
  }
})