import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { RootState } from "./store";
import { GlobalState } from "../lib/interfaces";

const initialState: GlobalState = {
  currentUser: null,
  currentAdmin: null
}

export const thisSlice = createSlice({
  name: 'user slice',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    removeCurrentUser: (state) => {
      state.currentUser = null
      new Cookies().remove("ut", {path: "/"})
    },
    setCurrentAdmin: (state, action) => {
      state.currentAdmin = action.payload
    },
    removeCurrentAdmin: (state) => {
      state.currentAdmin = null
      new Cookies().remove("at", {path: "/"})
    }
  }
})

export const { setCurrentUser, removeCurrentUser, setCurrentAdmin, removeCurrentAdmin } = thisSlice.actions
export const selectUser = (state: RootState) => state.thisReducer.currentUser
export const selectAdmin = (state: RootState) => state.thisReducer.currentAdmin
export default thisSlice.reducer