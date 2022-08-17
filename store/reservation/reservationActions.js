import { types } from "../types";

export const setReservationState = (reservation) => ({
  type: types.SET_RESERVATION,
  payload: reservation,
});

export const resetReservationState = () => ({
  type: types.SET_RESERVATION,
  payload: {
    carId: "",
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    price: 0,
  },
});
