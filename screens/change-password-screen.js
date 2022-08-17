import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProfileCard from "../components/account/profile-card";
import Spacer from "../components/common/spacer";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import colors from "../utils/constants/colors";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { updatePassword } from "../api/user-service";

const ChangePasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isCurrentPassSecure, setIsCurrentPassSecure] = useState(true);
  const [isNewPassSecure, setIsNewPassSecure] = useState(true);
  const [isNewPassRetrySecure, setIsNewPassRetrySecure] = useState(true);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmNewPassword: Yup.string()
      .required("Please re-enter your new password")
      .oneOf([Yup.ref("newPassword")], "Password fields doesn't match"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const resp = updatePassword(values);
      resetForm();
      
      Toast.show({
        type: "success",
        text1: "Your password was updated successfully",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message,
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
    <ScrollView style={styles.container}>
      <ProfileCard />
      <Spacer />
      <TextInput
        label="Current Password"
        onChangeText={formik.handleChange("oldPassword")}
        onBlur={formik.handleBlur("oldPassword")}
        value={formik.values.oldPassword}
        secureTextEntry={isCurrentPassSecure}
        right={
          <TextInput.Icon
            name={isCurrentPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsCurrentPassSecure(!isCurrentPassSecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.oldPassword && formik.errors.oldPassword}
      >
        {formik.errors.oldPassword}
      </HelperText>

      <TextInput
        label="New Password"
        onChangeText={formik.handleChange("newPassword")}
        onBlur={formik.handleBlur("newPassword")}
        value={formik.values.newPassword}
        secureTextEntry={isNewPassSecure}
        right={
          <TextInput.Icon
            name={isNewPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsNewPassSecure(!isNewPassSecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.newPassword && formik.errors.newPassword}
      >
        {formik.errors.newPassword}
      </HelperText>

      <TextInput
        label="New Password (Retry)"
        onChangeText={formik.handleChange("confirmNewPassword")}
        onBlur={formik.handleBlur("confirmNewPassword")}
        value={formik.values.confirmNewPassword}
        secureTextEntry={isNewPassRetrySecure}
        right={
          <TextInput.Icon
            name={isNewPassRetrySecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsNewPassRetrySecure(!isNewPassRetrySecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={
          formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
        }
      >
        {formik.errors.confirmNewPassword}
      </HelperText>

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={!formik.isValid || loading}
      >
        Update Password
      </Button>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
