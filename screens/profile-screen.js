import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProfileCard from "../components/account/profile-card";
import { useStore } from "../store";
import { useFormik } from "formik";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { updateUser } from "../api/user-service";
import colors from "../utils/constants/colors";
import { MaskedTextInput } from "react-native-mask-text";
import Spacer from "../components/common/spacer";
import Toast from "react-native-toast-message";
import { loginSuccess } from "../store/user/userActions";


const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { userState, dispatchUser } = useStore();
  const { user } = userState;

  const initialValues = user;

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
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      var x = 50;
      var y = x;

      const payload = {...values};
      delete payload["roles"];

      const resp = await updateUser(payload);
      dispatchUser(loginSuccess(values));

      Toast.show(
        {
          type:"success",
          text1: "Your profile was updated successfully"
        }
      )

    } catch (err) {
      console.log(err.response.data);
      Toast.show(
        {
          type:"error",
          text1: err?.response?.data?.message
        }
      )
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
      <Spacer/>
      <TextInput
        label="First Name"
        onChangeText={formik.handleChange("firstName")}
        onBlur={formik.handleBlur("firstName")}
        value={formik.values.firstName}
        activeUnderlineColor={colors.color3}
      />
      <HelperText type="error" visible={formik.touched.firstName && formik.errors.firstName}>
        {formik.errors.firstName}
      </HelperText>

      <TextInput
        label="Last Name"
        onChangeText={formik.handleChange("lastName")}
        onBlur={formik.handleBlur("lastName")}
        value={formik.values.lastName}
        activeUnderlineColor={colors.color3}
      />
      <HelperText type="error" visible={formik.touched.lastName && formik.errors.lastName}>
        {formik.errors.lastName}
      </HelperText>

      <TextInput
        label="Phone Number"
        value={formik.values.phoneNumber}
        defaultValue={formik.values.phoneNumber}
        onChangeText={formik.handleChange("phoneNumber")}
        onBlur={formik.handleBlur("phoneNumber")}
        activeUnderlineColor={colors.color3}
        keyboardType="phone-pad"
        render={(props) => <MaskedTextInput {...props} mask="(999) 999-9999" />}
      />
      <HelperText
        type="error"
        visible={formik.touched.phoneNumber && formik.errors.phoneNumber}
      >
        {formik.errors.phoneNumber}
      </HelperText>

      <TextInput
        label="Address"
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        value={formik.values.address}
        activeUnderlineColor={colors.color3}
      />
      <HelperText type="error" visible={formik.touched.address && formik.errors.address}>
        {formik.errors.address}
      </HelperText>

      <TextInput
        label="Zip Code"
        onChangeText={formik.handleChange("zipCode")}
        onBlur={formik.handleBlur("zipCode")}
        value={formik.values.zipCode}
        activeUnderlineColor={colors.color3}
        keyboardType="number-pad"
      />
      <HelperText type="error" visible={formik.touched.zipCode && formik.errors.zipCode}>
        {formik.errors.zipCode}
      </HelperText>

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={!formik.isValid || loading}
      >
        Save
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding:10,
  },
  button:{
    marginBottom:30
  }
});
