import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
} from "react-native-paper";
import Main from "./main";
import { StoreProvider, useStore } from "./store";
import colors from "./utils/constants/colors";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 30,
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
        <Main />
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
