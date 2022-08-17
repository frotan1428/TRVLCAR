import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  HelperText,
  TextInput,
  Title,
} from "react-native-paper";
import * as Yup from "yup";
import { useFormik } from "formik";
import colors from "../../utils/constants/colors";
import { useStore } from "../../store";
import { MaskedTextInput } from "react-native-mask-text";
import { formatDateTime } from "../../utils/functions/datetime";
import { createReservation } from "../../api/reservation-service";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { resetReservationState, setReservationState } from "../../store/reservation/reservationActions";

const PaymentForm = ({ setActiveScreen }) => {
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const { reservationState, dispatchReservation } = useStore();
  const { reservation } = reservationState;

  const navigation = useNavigation();

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
    expireDate: Yup.string().required("Please enter the expire date"),
    cvc: Yup.number()
      .typeError("Must be number")
      .required("Please enter the cvc"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
  });

  const onSubmit = async (values) => {
    try {
      if (!reservation || Object.keys(reservation).length <= 0)
        throw "Reservation not found";

      setLoading(true);

      const {
        carId,
        pickUpLocation,
        dropOffLocation,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
      } = reservation;

      const reservationDto = {
        carId,
        pickUpLocation,
        dropOfLocation: dropOffLocation,
        pickUpTime: formatDateTime(pickUpDate, pickUpTime),
        dropOfTime: formatDateTime(dropOffDate, dropOffTime),
      };

      const resp = await createReservation(reservationDto);

      dispatchReservation(resetReservationState());

      setLoading(false);

      //navigation.navigate("reservation-result");

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'cars' },
            { name: 'reservation-result' }
            
          ],
        })
      );



    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message ?? err,
      });

      setLoading(false);
    }
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
          <Title>${reservation.price}</Title>
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
        render={(props) => (
          <MaskedTextInput {...props} mask="9999-9999-9999-9999" />
        )}
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
            render={(props) => (
              <MaskedTextInput
                {...props}
                mask="99/99"
                onFocus={() => setPlaceholder("MM/YY")}
                onBlur={() => setPlaceholder("")}
                placeholder={placeholder}
              />
            )}
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
            render={(props) => <MaskedTextInput {...props} mask="999" />}
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
          onPress={formik.handleSubmit}
          style={styles.primaryButton}
          loading={loading}
          disabled={!formik.isValid || loading}
        >
          Checkout
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            setActiveScreen("reservation");
          }}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryButtonLabel}
        >
          Return Back
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
  secondaryButtonLabel: {
    color: "white",
  },
  priceCard: {
    alignItems: "center",
  },
});
