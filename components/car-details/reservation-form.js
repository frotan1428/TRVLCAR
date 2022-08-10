import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HelperText, TextInput } from "react-native-paper";

const ReservationForm = () => {


  const initialValues = {
    pickUpLocation:"",
    dropOffLocation:"",
    pickUpDate:"",
    pickUpTime:"",
    dropOffDate:"",
    dropOffTime:""
  }

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Required"),
    dropOffLocation:Yup.string().required("Required"),
    pickUpDate:Yup.string().required("Required"),
    pickUpTime:Yup.string().required("Required"),
    dropOffDate:Yup.string().required("Required"),
    dropOffTime:Yup.string().required("Required"),
  });


  const onSubmit = () => {

  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })





  return (
    <View style={styles.container}>
      <TextInput
        label="Pick-up Location"
        onChangeText={formik.handleChange("pickUpLocation")}
        value={formik.values.pickUpLocation}

      />
      <HelperText type="error" visible={formik.errors.pickUpLocation}>
        {formik.errors.pickUpLocation}
      </HelperText>

      <TextInput
        label="Pick-up Location"
        onChangeText={formik.handleChange("pickUpLocation")}
        value={formik.values.pickUpLocation}

      />
      <HelperText type="error" visible={formik.errors.pickUpLocation}>
        {formik.errors.pickUpLocation}
      </HelperText>
    </View>
  );
};

export default ReservationForm;

const styles = StyleSheet.create({});
