import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlices";
import modalSlices from "./modalSlices";


export const store = configureStore({
    reducer:{
        user: userReducer,
        modal: modalSlices,
    }
})