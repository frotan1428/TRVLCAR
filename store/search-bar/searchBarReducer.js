import { types } from "../types";
import { searchBarInitialState } from "./searchBarInitialState";


export const searchBarReducer = (state = searchBarInitialState, action) =>{
    if(action.type === types.SET_SEARCH_BAR_VISIBILITY){
        return {
            ...state,
            isSearchBarVisible: action.payload
        }
    }
}