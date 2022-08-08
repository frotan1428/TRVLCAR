import { types } from "../types";
import { vehiclesInitalState } from "./vehiclesInitialState";

export const vehiclesReducer = (state = vehiclesInitalState, action) => {
    if(action.type === types.SET_VEHICLES){
        return {
            ...state,
            vehicles: action.payload
        }
    }
}