import { types } from "../types";
import { reservationInitialState } from "./reservationInitialState";

export const reservationReducer = (action) => {
  if (action.type === types.SET_RESERVATION) {
    return {
      ...reservationInitialState,
      reservation: action.payload,
    };
  }
};
