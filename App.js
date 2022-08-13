import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
} from "react-native-paper";
import Main from "./main";
import { StoreProvider, useStore } from "./store";
import colors from "./utils/constants/colors";
import "intl";
import "intl/locale-data/jsonp/en";
import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import Toast from 'react-native-toast-message';

registerTranslation('en-GB', enGB)


const theme = {
  ...DefaultTheme,
  dark: false,
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
        <Toast/>
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
