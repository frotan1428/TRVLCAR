import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Card, Checkbox, HelperText, TextInput, Title } from "react-native-paper";
import * as Yup from "yup";
import { useFormik } from "formik";
import colors from "../../utils/constants/colors";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    cardNo: "",
    nameOnCard: "",
    expireDate: "",
    cvc: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    cardNo: Yup.string().required("Please enter the card number"),
    nameOnCard: Yup.string().required("Please enter the name of card"),
    expireDate: Yup.string()
      .required("Please enter the expire date"),
    cvc: Yup.number()
      .typeError("Must be number")
      .required("Please enter the cvc"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
  });

  const onSubmit =  () => {
    
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <Card mode="outlined">
        <Card.Content style={styles.priceCard}>
          <Title>Total Price</Title>
          <Title>$XXXX</Title>
        </Card.Content>
      </Card>

      <TextInput
        label="Card Number"
        value={formik.values.cardNo}
        onChangeText={formik.handleChange("cardNo")}
        onBlur={formik.handleBlur("cardNo")}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="number-pad"
      />

      <HelperText
        type="error"
        visible={formik.touched.cardNo && formik.errors.cardNo}
      >
        {formik.errors.cardNo}
      </HelperText>

      <TextInput
        label="Name on card"
        onChangeText={formik.handleChange("nameOnCard")}
        onBlur={formik.handleBlur("nameOnCard")}
        value={formik.values.nameOnCard}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.nameOnCard && formik.errors.nameOnCard}
      >
        {formik.errors.nameOnCard}
      </HelperText>

      <View style={styles.dateRow}>
        <View style={{ flex: 4 }}>
          <TextInput
            label="Expire Date"
            value={formik.values.expireDate}
            onChangeText={formik.handleChange("expireDate")}
            onBlur={formik.handleBlur("expireDate")}
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            keyboardType="number-pad"
          />

          <HelperText
            type="error"
            visible={formik.touched.expireDate && formik.errors.expireDate}
          >
            {formik.errors.expireDate}
          </HelperText>
        </View>
        <View style={{ flex: 3 }}>
          <TextInput
            label="CVC"
            value={formik.values.cvc}
            onChangeText={formik.handleChange("cvc")}
            onBlur={formik.handleBlur("cvc")}
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            keyboardType="number-pad"
          />

          <HelperText
            type="error"
            visible={formik.touched.cvc && formik.errors.cvc}
          >
            {formik.errors.cvc}
          </HelperText>
        </View>
      </View>

      <Checkbox.Item
        label="I have read and aggree the sales contract"
        status={formik.values.contract ? "checked" : "unchecked"}
        position="leading"
        color={colors.color1}
        onPress={() => {
          formik.setFieldValue("contract", !formik.values.contract);
        }}
      />
      <HelperText
        type="error"
        visible={formik.touched.contract && formik.errors.contract}
      >
        {formik.errors.contract}
      </HelperText>

      <View>
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryButtonLabel}
        >
          Return Back
        </Button>

        <Button
          mode="contained"
          onPress={formik.handleSubmit}
          style={styles.primaryButton}
          loading={loading}
          disabled={!formik.isValid || loading}
        >
          Checkout
        </Button>
      </View>
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  form: {
    marginVertical: 30,
    padding: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.color4,
    marginVertical: 10,
  },
  dateRow: {
    flexDirection: "row",
  },
  primaryButton: {
    marginTop: 30,
  },
  secondaryButton: {
    marginTop: 30,
    backgroundColor: colors.color6,

  },
  secondaryButtonLabel:{
    color: "white"
  },
  priceCard: {
    alignItems: "center",
  },
});
