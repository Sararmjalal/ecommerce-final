import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../Store";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export interface CurrentUserState {
  currentUser: null;
}

const initialState: CurrentUserState = {
  currentUser: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload._id) state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      cookie.remove("ut", {path: "/"});
      state.currentUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser: setCurrentUser, unsetCurrentUser: signOut} =
  currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.currentUser;

export default currentUserSlice.reducer;
