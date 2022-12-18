import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../Store";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export interface CurrentAdminState {
  currentAdmin: null;
}

const initialState: CurrentAdminState = {
  currentAdmin: null,
};

export const currentAdminSlice = createSlice({
  name: "currentAdmin",
  initialState,
  reducers: {
    setCurrentAdmin: (state, action) => {
      if (action.payload._id) state.currentAdmin = action.payload;
    },
    unsetCurrentAdmin: (state) => {
      cookie.remove("at", {path: "/"});
      state.currentAdmin = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentAdmin: setCurrentUser, unsetCurrentAdmin: signOut} =
  currentAdminSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.currentUser;

export default currentAdminSlice.reducer;
