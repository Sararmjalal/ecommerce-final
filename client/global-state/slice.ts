import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { RootState } from "./store";
import { GlobalState } from "../lib/interfaces";

const initialState: GlobalState = {
  currentUser: null,
  currentAdmin: null,
  currentCart:null
};

export const thisSlice = createSlice({
  name: 'user slice',
  initialState,
  reducers: {
    setCurrentCart: (state, action) => {
      state.currentCart = action.payload
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    removeCurrentUser: (state) => {
      state.currentUser = null
      new Cookies().remove("ut", {path: "/"})
    },
    removeCurrentCart: (state) => {
      state.currentCart = null
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

export const { setCurrentUser, removeCurrentUser, setCurrentAdmin, removeCurrentAdmin, removeCurrentCart, setCurrentCart } = thisSlice.actions
export const selectUser = (state: RootState) => state.thisReducer.currentUser
export const selectAdmin = (state: RootState) => state.thisReducer.currentAdmin
export const selectCart = (state: RootState) => state.thisReducer.currentCart
export default thisSlice.reducer