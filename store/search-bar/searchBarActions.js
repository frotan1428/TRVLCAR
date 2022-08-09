import { types } from "../types";

export const setSearchBarVisibilty = (visible) => ({
    type: types.SET_SEARCH_BAR_VISIBILITY,
    payload: visible
})