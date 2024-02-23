import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export interface AuthState {
  isAuthenticated: boolean;
  username: string;

  email: string
}


const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
  email: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      cookie.remove("AUTH_TOKEN");
      state.isAuthenticated = false;
      state.username = "";
      // state.imageUrl = "";
      state.email = ""
    },
    register :(state,action) =>{ 
      state.username = action.payload.username
      state.email = action.payload.email
    },
    updateProfile: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
     
    }
  },
});

export const {logout,login,register} = authSlice.actions
export default authSlice.reducer
