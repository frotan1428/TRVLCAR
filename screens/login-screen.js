import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import colors from "../utils/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { getUser, login } from "../api/user-service";
import * as SecureStore from "expo-secure-store";
import { useStore } from "../store";
import { loginSuccess } from "../store/user/userActions";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isPassSecure, setIsPassSecure] = useState(true);
  const navigation = useNavigation();
  const { dispatchUser } = useStore();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const respLogin = await login(values);
      await SecureStore.setItemAsync("token", respLogin.data.token);

      const respUser = await getUser();
      setLoading(false);
      dispatchUser(loginSuccess(respUser.data));
      // Bu satırdan sonra state güncellemesi olursa hata olur.
      // Çünkü bu satırdan sonra login ekranından, profile ekranına geçiliyor
      // Geçtikten sonra yapılacak state güncellemeleri hataya sebep oluyor

      //setLoading(false);

      Toast.show({
        type: "success",
        text1: "Loged in successfully",
      });
    } catch (error) {
      Toast.show({
        type: "success",
        text1: error.response.data.message,
      });
      setLoading(false);
    }
    
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <TextInput
        label="Email"
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        style={styles.textInput}
        keyboardType="email-address"
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.email && formik.errors.email}
      >
        {formik.errors.email}
      </HelperText>

      <TextInput
        label="Password"
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        style={styles.textInput}
        secureTextEntry={isPassSecure}
        right={
          <TextInput.Icon
            name={isPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsPassSecure((prev) => !prev);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.password && formik.errors.password}
      >
        {formik.errors.password}
      </HelperText>

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={!formik.isValid || loading}
      >
        Login
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("register")}
        style={styles.button}
      >
        Click to create a new account
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.color4,
    marginVertical: 10,
  },
  error: {
    fontSize: 12,
    fontStyle: "italic",
    color: "red",
  },
  button: {
    marginTop: 30,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.color5,
  },
  registerLink: {
    textAlign: "center",
    marginTop: 20,
  },
});
