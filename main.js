import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TabNavigator from "./screens/navigations/tab-navigator";
import { useStore } from "./store";
import { getVehicles } from "./api/vehicle-service";
import { setVehiclesInStore } from "./store/vehicles/vehiclesActions";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const Main = () => {
  const { dispatchVehicles } = useStore();
  const [appIsReady, setAppIsReady] = useState(false);

  const loadData = async () => {
    try {
      /*** LOAD VEHICLES ***/
      const respVehicles = await getVehicles();
      dispatchVehicles(setVehiclesInStore(respVehicles.data));
    } catch (error) {
      console.log(error);
    }
    finally{
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);



  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}  onLayout={onLayoutRootView}>
      <TabNavigator />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
