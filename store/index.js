import { createContext, useContext, useReducer } from "react";
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

  const providerValues = { vehiclesState, dispatchVehicles };

  return <Store.Provider value={providerValues}>{children}</Store.Provider>;
};
