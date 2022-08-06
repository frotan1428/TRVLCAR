import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider as PaperProvider, DefaultTheme, Button } from "react-native-paper";
import TabNavigator from "./screens/navigations/tab-navigator";
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
    <PaperProvider theme={theme}>
        <TabNavigator/>
        <StatusBar style="auto" />
    </PaperProvider>
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
