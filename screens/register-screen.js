import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import colors from "../utils/constants/colors";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { register } from "../api/user-service";
import { MaskedTextInput } from "react-native-mask-text";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [isPassRetrySecure, setIsPassRetrySecure] = useState(true);
  const navigation = useNavigation();

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string()
      .required()
      .test(
        "includes_",
        "Please enter your phone number",
        (value) => value && !value.includes("_")
      ),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password fields doesn't match"),
  });

  const onSubmit = (values) => {
    try {
      setLoading(true);
      const resp = register(values);

      Toast.show({
        type: "success",
        text1: "You registered successfully",
      });
      navigation.navigate("login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
    }
    finally{
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ScrollView style={styles.form}>
      <TextInput
        label="First Name"
        onChangeText={formik.handleChange("firstName")}
        onBlur={formik.handleBlur("firstName")}
        value={formik.values.firstName}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      {formik.touched.firstName && formik.errors.firstName && (
        <Text style={styles.error}>{formik.errors.firstName}</Text>
      )}

      <TextInput
        label="Last Name"
        onChangeText={formik.handleChange("lastName")}
        onBlur={formik.handleBlur("lastName")}
        value={formik.values.lastName}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <Text style={styles.error}>{formik.errors.lastName}</Text>
      )}

      <TextInput
        label="Phone Number"
        value={formik.values.phoneNumber}
        onChangeText={formik.handleChange("phoneNumber")}
        onBlur={formik.handleBlur("phoneNumber")}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="phone-pad"
        render={(props) => <MaskedTextInput {...props} mask="(999) 999-9999" />}
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
      )}

      <TextInput
        label="Address"
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        value={formik.values.address}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      {formik.touched.address && formik.errors.address && (
        <Text style={styles.error}>{formik.errors.address}</Text>
      )}

      <TextInput
        label="Zip Code"
        onChangeText={formik.handleChange("zipCode")}
        onBlur={formik.handleBlur("zipCode")}
        value={formik.values.zipCode}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="number-pad"
      />
      {formik.touched.zipCode && formik.errors.zipCode && (
        <Text style={styles.error}>{formik.errors.zipCode}</Text>
      )}

      <TextInput
        label="Email"
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="email-address"
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={styles.error}>{formik.errors.email}</Text>
      )}

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
              setIsPassSecure(!isPassSecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}

      <TextInput
        label="Password (Retry)"
        onChangeText={formik.handleChange("confirmPassword")}
        onBlur={formik.handleBlur("confirmPassword")}
        value={formik.values.confirmPassword}
        style={styles.textInput}
        secureTextEntry={isPassRetrySecure}
        right={
          <TextInput.Icon
            name={isPassRetrySecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsPassRetrySecure(!isPassRetrySecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
      )}

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.buttonSubmit}
        loading={loading}
        disabled={!formik.isValid || loading}
      >
        Register
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("login")}
        style={styles.buttonLogin}
        loading={loading}
        disabled={!formik.isValid || loading}
      >
        Click here to login
      </Button>
    </ScrollView>
  );
};

export default RegisterScreen;

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
  buttonSubmit: {
    marginTop: 30,
  },
  buttonLogin: {
    marginTop: 30,
    marginBottom: 60,
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
