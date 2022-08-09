import { createContext, useContext, useReducer } from "react";
import { searchBarInitialState } from "./search-bar/searchBarInitialState";
import { searchBarReducer } from "./search-bar/searchBarReducer";
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

  const [searchBarState, dispatchSearchBar] = useReducer(searchBarReducer, searchBarInitialState);

  const providerValues = { vehiclesState, dispatchVehicles, searchBarState, dispatchSearchBar };

  return <Store.Provider value={providerValues}>{children}</Store.Provider>;
};
