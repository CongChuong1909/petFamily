import { configureStore } from "@reduxjs/toolkit";
import  userSlices  from "./userSlices";
import modalSlices from "./modalSlices";
import relationshipSlices from "./relationshipSlices";
import friendSlices from "./friendSlice";


export const store = configureStore({
    reducer:{
        user: userSlices,
        modal: modalSlices,
        relationship: relationshipSlices,
        friend: friendSlices
    }
})