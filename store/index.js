import { createContext, useContext, useReducer } from "react";
import { reservationInitialState } from "./reservation/reservationInitialState";
import { reservationReducer } from "./reservation/reservationReducer";
import { searchBarInitialState } from "./search-bar/searchBarInitialState";
import { searchBarReducer } from "./search-bar/searchBarReducer";
import { userInitialState } from "./user/userInitialState";
import { userReducer } from "./user/userReducer";
import { vehiclesInitalState } from "./vehicles/vehiclesInitialState";
import { vehiclesReducer } from "./vehicles/vehiclesReducer";

// Boş bir merkezi state oluşturuldu
const Store = createContext(null);

//Merkezi state in diğer componentlerde kolayca kullanılması için bir hook oluşturduk.
export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  const [vehiclesState, dispatchVehicles] = useReducer(
    vehiclesReducer,
    vehiclesInitalState
  );

  const [searchBarState, dispatchSearchBar] = useReducer(
    searchBarReducer,
    searchBarInitialState
  );
  const [reservationState, dispatchReservation] = useReducer(
    reservationReducer,
    reservationInitialState
  );

  const [userState, dispatchUser] = useReducer(userReducer, userInitialState);

  const providerValues = {
    vehiclesState,
    dispatchVehicles,
    searchBarState,
    dispatchSearchBar,
    reservationState,
    dispatchReservation,
    userState,
    dispatchUser,
  };

  return <Store.Provider value={providerValues}>{children}</Store.Provider>;
};
