import axios from "axios";
import { settings } from "../utils/settings";
import { authHeader } from "./auth-header";

const API_URL = settings.apiUrl;

export const isCarAvaliable = async (reservation) => {
  const { carId, dropOffDateTime, pickUpDateTime } = reservation;

  return axios.get(
    `${API_URL}/reservations/auth?carId=${carId}&dropOffDateTime=${dropOffDateTime}&pickUpDateTime=${pickUpDateTime}`,
    { headers: await authHeader() }
  );
};

export const createReservation = async (reservation) => {
  const { carId } = reservation;
  delete reservation.carId;

  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: await authHeader(),
  });
};

export const getReservations = async () => {
  return axios.get(`${API_URL}/reservations/auth/all`, {
    headers: await authHeader(),
  });
};
