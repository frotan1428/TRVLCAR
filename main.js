import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import TabNavigator from './screens/navigations/tab-navigator'
import { useStore } from './store';
import { getVehicles } from './api/vehicle-service';
import { setVehiclesInStore } from './store/vehicles/vehiclesActions';

const Main = () => {
    const { dispatchVehicles } = useStore();


  const loadData = async () => {
    try {
      /*** LOAD VEHICLES ***/
      const respVehicles = await getVehicles();
      dispatchVehicles(setVehiclesInStore(respVehicles.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <TabNavigator />
        <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})