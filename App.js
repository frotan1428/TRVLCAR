import { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
} from "react-native-paper";
import { getVehicles } from "./api/vehicle-service";
import Main from "./main";
import TabNavigator from "./screens/navigations/tab-navigator";
import { StoreProvider, useStore } from "./store";
import { setVehiclesInStore } from "./store/vehicles/vehiclesActions";
import colors from "./utils/constants/colors";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.color1,
    secondary: colors.color2,
    tertiary: colors.color3,
  },
};

export default function App() {

  return (
    <StoreProvider>
      <PaperProvider theme={theme}>
        <Main/>
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
