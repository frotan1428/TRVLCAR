import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, HelperText, TextInput } from "react-native-paper";
import colors from "../../utils/constants/colors";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import moment from "moment";
import { useStore } from "../../store";
import { checkDates, formatDateTime } from "../../utils/functions/datetime";

const ReservationForm = () => {
  const [loading, setLoading] = useState(false);
  const [isVisiblePickupDate, setIsVisiblePickupDate] = useState(false);
  const [isVisiblePickupTime, setIsVisiblePickupTime] = useState(false);
  const [isVisibleDropoffDate, setIsVisibleDropoffDate] = useState(false);
  const [isVisibleDropoffTime, setIsVisibleDropoffTime] = useState(false);

  const { reservationState, dispatchReservation } = useStore();
  const { reservation } = reservationState;

  const initialValues = reservation;

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Required"),
    dropOffLocation: Yup.string().required("Required"),
    pickUpDate: Yup.string().required("Required"),
    pickUpTime: Yup.string().required("Required"),
    dropOffDate: Yup.string().required("Required"),
    dropOffTime: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const { pickUpDate, pickUpTime } = values;

    try {
      // check is user login?
      // check the dates and times
      if (!checkDates(values))
        throw "Dropoff date time should be later than pickup date time";

      // is car avaliable
      // set reservation state
    } catch (error) {
      
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log(formik.isValid);

  return (
    <View style={styles.container}>
      <TextInput
        label="Pick-up Location"
        onChangeText={formik.handleChange("pickUpLocation")}
        onBlur={formik.handleBlur("pickUpLocation")}
        value={formik.values.pickUpLocation}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={formik.touched.pickUpLocation && formik.errors.pickUpLocation}
      >
        {formik.errors.pickUpLocation}
      </HelperText>

      <TextInput
        label="Drop-off Location"
        onChangeText={formik.handleChange("dropOffLocation")}
        onBlur={formik.handleBlur("dropOffLocation")}
        value={formik.values.dropOffLocation}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <HelperText
        type="error"
        visible={
          formik.touched.dropOffLocation && formik.errors.dropOffLocation
        }
      >
        {formik.errors.dropOffLocation}
      </HelperText>

      <View style={{ ...styles.dateRow }}>
        <View style={{ flex: 4 }}>
          <TextInput
            label="Pick-up Date"
            value={
              formik.values.pickUpDate
                ? moment(formik.values.pickUpDate, "YYYY-MM-DD").format(
                    "MM/DD/YYYY"
                  )
                : ""
            }
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            onPressIn={() => setIsVisiblePickupDate(true)}
          />
          <HelperText
            type="error"
            visible={formik.touched.pickUpDate && formik.errors.pickUpDate}
          >
            {formik.errors.pickUpDate}
          </HelperText>

          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={isVisiblePickupDate}
            onDismiss={() => setIsVisiblePickupDate(false)}
            date={formik.values.pickUpDate}
            onConfirm={(params) => {
              formik.setFieldValue("pickUpDate", params.date);
              setIsVisiblePickupDate(false);
            }}
            label="Select pick up date"
            saveLabel="OK"
            validRange={{
              startDate: new Date(), // optional
            }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <TextInput
            label="Time"
            value={formik.values.pickUpTime}
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            onPressIn={() => setIsVisiblePickupTime(true)}
          />
          <HelperText
            type="error"
            visible={formik.touched.pickUpTime && formik.errors.pickUpTime}
          >
            {formik.errors.pickUpTime}
          </HelperText>

          <TimePickerModal
            visible={isVisiblePickupTime}
            onDismiss={() => setIsVisiblePickupTime(false)}
            onConfirm={(params) => {
              formik.setFieldValue(
                "pickUpTime",
                `${params.hours}:${params.minutes}`
              );
              setIsVisiblePickupTime(false);
            }}
            hours={23} // default: current hours
            minutes={0} // default: current minutes
            label="Select pick up time" // optional, default 'Select time'
            uppercase={false} // optional, default is true
            animationType="fade" // optional, default is 'none'
            locale="en-DB" // optional, default is automically detected by your system
          />
        </View>
      </View>
      <View style={styles.dateRow}>
        <View style={{ flex: 4 }}>
          <TextInput
            label="Drop-off Date"
            value={
              formik.values.dropOffDate
                ? moment(formik.values.dropOffDate, "YYYY-MM-DD").format(
                    "MM/DD/YYYY"
                  )
                : ""
            }
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            onPressIn={() => setIsVisibleDropoffDate(true)}
          />
          <HelperText
            type="error"
            visible={formik.touched.dropOffDate && formik.errors.dropOffDate}
          >
            {formik.errors.dropOffDate}
          </HelperText>
          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={isVisibleDropoffDate}
            onDismiss={() => setIsVisibleDropoffDate(false)}
            date={formik.values.dropOffDate}
            onConfirm={(params) => {
              formik.setFieldValue("dropOffDate", params.date);
              setIsVisibleDropoffDate(false);
            }}
            label="Select drop off date"
            saveLabel="OK"
            validRange={{
              startDate: formik.values.pickUpDate
                ? formik.values.pickUpDate
                : new Date(), // optional
            }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <TextInput
            label="Time"
            value={formik.values.dropOffTime}
            style={styles.textInput}
            activeUnderlineColor={colors.color3}
            onPressIn={() => setIsVisibleDropoffTime(true)}
          />
          <HelperText
            type="error"
            visible={formik.touched.dropOffTime && formik.errors.dropOffTime}
          >
            {formik.errors.dropOffTime}
          </HelperText>

          <TimePickerModal
            visible={isVisibleDropoffTime}
            onDismiss={() => setIsVisibleDropoffTime(false)}
            onConfirm={(params) => {
              formik.setFieldValue(
                "dropOffTime",
                `${params.hours}:${params.minutes}`
              );
              setIsVisibleDropoffTime(false);
            }}
            hours={12} // default: current hours
            minutes={0} // default: current minutes
            label="Select drop off time" // optional, default 'Select time'
            uppercase={false} // optional, default is true
            animationType="fade" // optional, default is 'none'
            locale="en-DB" // optional, default is automically detected by your system
          />
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          onPress={formik.handleSubmit}
          style={styles.button}
          loading={loading}
          disabled={loading || !formik.isValid}
        >
          Check Availability
        </Button>
      </View>
    </View>
  );
};

export default ReservationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.color4,
  },
  dateRow: {
    flexDirection: "row",
  },
  button: {
    marginBottom: 20,
  },
});
