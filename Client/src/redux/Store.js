import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlices";

export const store = configureStore({
    reducer:{
        user: userReducer
    }
})